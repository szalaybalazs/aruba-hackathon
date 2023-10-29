import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import EditIcon from "@mui/icons-material/Edit";
import {
  Container,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import UserAvatar from "../components/UserAvatar";
import LoadingPage from "../components/LoadingPage";
import axios from "axios";

export type UserProfile = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
};

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
  });

  const handleSaveChanges = () => {
    // onUpdateProfile(editedProfile);
    setEditModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.access_token) return;
      try {
        const response = await axios.get("http://127.0.0.1:5001/profile", {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        });
        setProfileData({
          firstName: response.data.firstname,
          lastName: response.data.lastname,
          username: response.data.username,
          email: response.data.email,
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, [user]);

  if (!profileData) return <LoadingPage />;

  return (
    <Container
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "2rem",
          gap: "1rem",
        }}
      >
        <UserAvatar firstName={profileData.firstName} lastName={profileData.lastName} size={120} />
        <Typography variant="h5" gutterBottom>
          {profileData.firstName} {profileData.lastName}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          {profileData.username}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          {profileData.email}
        </Typography>
        <Button
          sx={{
            borderRadius: 5,
            backgroundColor: "#1d3557",
            color: "#f1faee",
            ":hover": { backgroundColor: "#457b9d" },
          }}
          variant="outlined"
          color="primary"
          startIcon={<EditIcon />}
          onClick={() => {
            setEditModalOpen(true);
            setEditedProfile(profileData);
          }}
        >
          Edit Profile
        </Button>
      </div>

      <Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="First Name"
            name="firstName"
            value={editedProfile.firstName}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Last Name"
            name="lastName"
            value={editedProfile.lastName}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Username"
            name="username"
            value={editedProfile.username}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Email"
            name="email"
            value={editedProfile.email}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditModalOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveChanges} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProfilePage;
