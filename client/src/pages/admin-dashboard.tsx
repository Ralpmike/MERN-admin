import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Loader,
  BadgeAlertIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/context/auth-context";
import { useGetAllUsers } from "@/hooks/query/useUsers";
import useDebounceValue from "@/hooks/useDebounceValue";
import Texthighlighter from "@/components/common/textHighlighter";
import EditUserDialog from "@/components/common/edit-user-dialog";
import {
  useCreateNewUser,
  useDeleteUser,
  useEditUser,
} from "@/hooks/mutate/usemutate.fn";
import AddUserDialog from "@/components/common/create.user.dialog";

// Type definition based on your Mongoose schema
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  location: string;
  nationality: string;
  city: string;
  state: string;
  phoneNumber: string;
  course:
    | "web developement"
    | "mobile development"
    | "backend development"
    | "game development"
    | "design"
    | "other";
  createdAt: string;
  updatedAt: string;
}

// Mock data that matches your schema
// const mockUsers: User[] = [
//   {
//     _id: "1",
//     firstName: "John",
//     lastName: "Doe",
//     email: "john.doe@example.com",
//     age: 25,
//     location: "123 Main St, New York, NY",
//     nationality: "american",
//     city: "New York",
//     state: "NY",
//     phoneNumber: "+1 (555) 123-4567",
//     course: "web developement",
//     createdAt: "2024-01-15T10:30:00Z",
//     updatedAt: "2024-01-15T10:30:00Z",
//   },
//   {
//     _id: "2",
//     firstName: "Jane",
//     lastName: "Smith",
//     email: "jane.smith@example.com",
//     age: 28,
//     location: "456 Oak Ave, Los Angeles, CA",
//     nationality: "american",
//     city: "Los Angeles",
//     state: "CA",
//     phoneNumber: "+1 (555) 987-6543",
//     course: "mobile development",
//     createdAt: "2024-01-16T14:20:00Z",
//     updatedAt: "2024-01-16T14:20:00Z",
//   },
//   {
//     _id: "3",
//     firstName: "Ahmed",
//     lastName: "Hassan",
//     email: "ahmed.hassan@example.com",
//     age: 30,
//     location: "789 Pine St, Chicago, IL",
//     nationality: "egyptian",
//     city: "Chicago",
//     state: "IL",
//     phoneNumber: "+1 (555) 456-7890",
//     course: "backend development",
//     createdAt: "2024-01-17T09:15:00Z",
//     updatedAt: "2024-01-17T09:15:00Z",
//   },
//   {
//     _id: "4",
//     firstName: "Maria",
//     lastName: "Garcia",
//     email: "maria.garcia@example.com",
//     age: 26,
//     location: "321 Elm St, Miami, FL",
//     nationality: "spanish",
//     city: "Miami",
//     state: "FL",
//     phoneNumber: "+1 (555) 234-5678",
//     course: "design",
//     createdAt: "2024-01-18T16:45:00Z",
//     updatedAt: "2024-01-18T16:45:00Z",
//   },
//   {
//     _id: "5",
//     firstName: "David",
//     lastName: "Wilson",
//     email: "david.wilson@example.com",
//     age: 32,
//     location: "654 Maple Dr, Seattle, WA",
//     nationality: "canadian",
//     city: "Seattle",
//     state: "WA",
//     phoneNumber: "+1 (555) 345-6789",
//     course: "game development",
//     createdAt: "2024-01-19T11:30:00Z",
//     updatedAt: "2024-01-19T11:30:00Z",
//   },
//   {
//     _id: "6",
//     firstName: "Lisa",
//     lastName: "Chen",
//     email: "lisa.chen@example.com",
//     age: 24,
//     location: "987 Cedar Ln, Austin, TX",
//     nationality: "chinese",
//     city: "Austin",
//     state: "TX",
//     phoneNumber: "+1 (555) 567-8901",
//     course: "other",
//     createdAt: "2024-01-20T13:20:00Z",
//     updatedAt: "2024-01-20T13:20:00Z",
//   },
// ];

const courseColors = {
  "web developement": "bg-blue-100 text-blue-800",
  "mobile development": "bg-green-100 text-green-800",
  "backend development": "bg-purple-100 text-purple-800",
  "game development": "bg-orange-100 text-orange-800",
  design: "bg-pink-100 text-pink-800",
  other: "bg-gray-100 text-gray-800",
};

export default function UsersTable() {
  // const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [courseFilter, setCourseFilter] = useState<string>("all");
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const {
    data: users = [],
    isLoading,
    error,
  } = useGetAllUsers(currentPage, pageSize);
  const { mutate: updateUserFn, isPending: isUpdatePending } = useEditUser();
  const { mutate: deleteUserFn, isPending: isDeletePending } = useDeleteUser();
  const { mutate: addUserFn, isPending: isAddPending } = useCreateNewUser();

  const debouncedSearch = useDebounceValue(searchTerm, 500);
  const filteredUsers = useMemo(() => {
    if (!users) return [];

    return users.filter((user) => {
      const matchesSearch =
        user.firstName.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        user.lastName.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        user.email.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        user.city.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        user.state.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        user.nationality.toLowerCase().includes(debouncedSearch.toLowerCase());

      const matchesCourse =
        courseFilter === "all" || user.course === courseFilter;

      return matchesSearch && matchesCourse;
    });
  }, [users, debouncedSearch, courseFilter]);

  if (isLoading) {
    return (
      <div>
        <div className="flex items-center justify-center h-screen backdrop:blur">
          <Loader className="animate-spin w-12 h-12" />
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen backdrop:blur">
        <p className="text-red-500">
          {" "}
          <BadgeAlertIcon />
          <strong>Error:</strong> {error.message}
        </p>
      </div>
    );
  }
  console.log("users data", users);

  // Filter users based on search term and course filter

  const handleDeleteUser = (userId: string) => {
    deleteUserFn(userId, {
      onSuccess: () => {
        setDeleteUserId(null);
      },
      onError: () => {
        toast.error("Failed to delete user");
      },
    });
  };

  const handleEditUser = (updatedUser: User) => {
    updateUserFn(updatedUser, {
      onSuccess: () => {
        setEditUser(null);
      },
      onError: () => {
        toast.error("Failed to update user");
      },
    });
  };

  const handleAddUser = (newUser: User) => {
    // setUsers([...users, user]);
    addUserFn(newUser, {
      onSuccess: () => {
        setAddUserOpen(false);
      },
      onError: () => {
        toast.error("Failed to add user");
      },
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card className="w-full">
      <div className="ml-auto px-5">
        <Button onClick={handleLogout}>logout</Button>
      </div>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-2xl font-bold">
              Registered Users
            </CardTitle>
            <CardDescription>
              Manage all registered users ({filteredUsers?.length} of{" "}
              {users.length} users)
            </CardDescription>
          </div>
          <Button className="w-fit" onClick={() => setAddUserOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add New User
          </Button>
        </div>

        {/* Search and Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search users by name, email, city, or state..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <Select value={courseFilter} onValueChange={setCourseFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                <SelectItem value="web developement">
                  Web Development
                </SelectItem>
                <SelectItem value="mobile development">
                  Mobile Development
                </SelectItem>
                <SelectItem value="backend development">
                  Backend Development
                </SelectItem>
                <SelectItem value="game development">
                  Game Development
                </SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Nationality</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers?.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    className="text-center py-8 text-gray-500"
                  >
                    {searchTerm || courseFilter !== "all"
                      ? "No users found matching your criteria"
                      : "No users registered yet"}
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers?.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell className="font-medium">
                      <Texthighlighter
                        text={user.firstName}
                        highlight={debouncedSearch}
                      />{" "}
                      <Texthighlighter
                        text={user.lastName}
                        highlight={debouncedSearch}
                      />
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.age}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>
                          {user.city}, {user.state}
                        </div>
                        <div
                          className="text-gray-500 truncate max-w-[150px]"
                          title={user.location}
                        >
                          {user.location}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="capitalize">
                      {user.nationality}
                    </TableCell>
                    <TableCell>{user.phoneNumber}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          courseColors[user.course as keyof typeof courseColors]
                        }
                      >
                        {user.course}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {formatDate(user.createdAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditUser(user)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setDeleteUserId(user._id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteUserId}
        onOpenChange={() => setDeleteUserId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              user account and remove their data from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteUserId && handleDeleteUser(deleteUserId)}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeletePending ? "Deleting..." : "Delete User"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit User Dialog */}
      {editUser && (
        <EditUserDialog
          user={editUser}
          onSave={handleEditUser}
          onCancel={() => setEditUser(null)}
          isPending={isUpdatePending}
        />
      )}

      {/* Add User Dialog */}
      {addUserOpen && (
        <AddUserDialog
          onSave={handleAddUser}
          onCancel={() => setAddUserOpen(false)}
          isPending={isAddPending}
        />
      )}
    </Card>
  );
}

// Edit User Dialog Component

// Add User Dialog Component
