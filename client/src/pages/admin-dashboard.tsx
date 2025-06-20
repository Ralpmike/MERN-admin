"use client";

import type React from "react";

import { useState } from "react";
import { toast } from "sonner";
import { Edit, Trash2, Plus, Search, Filter } from "lucide-react";

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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

// Type definition based on your Mongoose schema
interface User {
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
const mockUsers: User[] = [
  {
    _id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    age: 25,
    location: "123 Main St, New York, NY",
    nationality: "american",
    city: "New York",
    state: "NY",
    phoneNumber: "+1 (555) 123-4567",
    course: "web developement",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
  {
    _id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    age: 28,
    location: "456 Oak Ave, Los Angeles, CA",
    nationality: "american",
    city: "Los Angeles",
    state: "CA",
    phoneNumber: "+1 (555) 987-6543",
    course: "mobile development",
    createdAt: "2024-01-16T14:20:00Z",
    updatedAt: "2024-01-16T14:20:00Z",
  },
  {
    _id: "3",
    firstName: "Ahmed",
    lastName: "Hassan",
    email: "ahmed.hassan@example.com",
    age: 30,
    location: "789 Pine St, Chicago, IL",
    nationality: "egyptian",
    city: "Chicago",
    state: "IL",
    phoneNumber: "+1 (555) 456-7890",
    course: "backend development",
    createdAt: "2024-01-17T09:15:00Z",
    updatedAt: "2024-01-17T09:15:00Z",
  },
  {
    _id: "4",
    firstName: "Maria",
    lastName: "Garcia",
    email: "maria.garcia@example.com",
    age: 26,
    location: "321 Elm St, Miami, FL",
    nationality: "spanish",
    city: "Miami",
    state: "FL",
    phoneNumber: "+1 (555) 234-5678",
    course: "design",
    createdAt: "2024-01-18T16:45:00Z",
    updatedAt: "2024-01-18T16:45:00Z",
  },
  {
    _id: "5",
    firstName: "David",
    lastName: "Wilson",
    email: "david.wilson@example.com",
    age: 32,
    location: "654 Maple Dr, Seattle, WA",
    nationality: "canadian",
    city: "Seattle",
    state: "WA",
    phoneNumber: "+1 (555) 345-6789",
    course: "game development",
    createdAt: "2024-01-19T11:30:00Z",
    updatedAt: "2024-01-19T11:30:00Z",
  },
  {
    _id: "6",
    firstName: "Lisa",
    lastName: "Chen",
    email: "lisa.chen@example.com",
    age: 24,
    location: "987 Cedar Ln, Austin, TX",
    nationality: "chinese",
    city: "Austin",
    state: "TX",
    phoneNumber: "+1 (555) 567-8901",
    course: "other",
    createdAt: "2024-01-20T13:20:00Z",
    updatedAt: "2024-01-20T13:20:00Z",
  },
];

const courseColors = {
  "web developement": "bg-blue-100 text-blue-800",
  "mobile development": "bg-green-100 text-green-800",
  "backend development": "bg-purple-100 text-purple-800",
  "game development": "bg-orange-100 text-orange-800",
  design: "bg-pink-100 text-pink-800",
  other: "bg-gray-100 text-gray-800",
};

export default function UsersTable() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [courseFilter, setCourseFilter] = useState<string>("all");
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  const [editUser, setEditUser] = useState<User | null>(null);

  // Filter users based on search term and course filter
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.state.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCourse =
      courseFilter === "all" || user.course === courseFilter;

    return matchesSearch && matchesCourse;
  });

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((user) => user._id !== userId));
    setDeleteUserId(null);
    toast.success("User deleted successfully");
  };

  const handleEditUser = (updatedUser: User) => {
    setUsers(
      users.map((user) => (user._id === updatedUser._id ? updatedUser : user))
    );
    setEditUser(null);
    toast.success("User updated successfully");
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
        <Button>logout</Button>
      </div>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-2xl font-bold">
              Registered Users
            </CardTitle>
            <CardDescription>
              Manage all registered users ({filteredUsers.length} of{" "}
              {users.length} users)
            </CardDescription>
          </div>
          <Button className="w-fit">
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
              onChange={(e) => setSearchTerm(e.target.value)}
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
              {filteredUsers.length === 0 ? (
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
                filteredUsers.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell className="font-medium">
                      {user.firstName} {user.lastName}
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
                      <Badge className={courseColors[user.course]}>
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
              Delete User
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
        />
      )}
    </Card>
  );
}

// Edit User Dialog Component
interface EditUserDialogProps {
  user: User;
  onSave: (user: User) => void;
  onCancel: () => void;
}

function EditUserDialog({ user, onSave, onCancel }: EditUserDialogProps) {
  const [formData, setFormData] = useState<User>({
    ...user,
    updatedAt: new Date().toISOString(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleInputChange = (field: keyof User, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      updatedAt: new Date().toISOString(),
    }));
  };

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Update user information. All fields are required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">First Name</label>
              <Input
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Last Name</label>
              <Input
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Age</label>
              <Input
                type="number"
                value={formData.age}
                onChange={(e) =>
                  handleInputChange("age", Number.parseInt(e.target.value))
                }
                min="16"
                max="100"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Location</label>
            <Input
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">City</label>
              <Input
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">State</label>
              <Input
                value={formData.state}
                onChange={(e) => handleInputChange("state", e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Nationality</label>
              <Input
                value={formData.nationality}
                onChange={(e) =>
                  handleInputChange("nationality", e.target.value)
                }
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Phone Number</label>
            <Input
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Course</label>
            <Select
              value={formData.course}
              onValueChange={(value) => handleInputChange("course", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
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

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
