import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Input } from "../ui/input";
import type { User } from "@/pages/admin-dashboard";
import { Button } from "../ui/button";

interface EditUserDialogProps {
  user: User;
  onSave: (user: User) => void;
  onCancel: () => void;
  isPending: boolean;
}

function EditUserDialog({
  user,
  onSave,
  onCancel,
  isPending,
}: EditUserDialogProps) {
  const [formData, setFormData] = useState<User>({
    ...user,
    updatedAt: new Date().toISOString(),
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      onSave(formData);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
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
            <Button type="submit" disabled={isPending || isLoading}>
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditUserDialog;
