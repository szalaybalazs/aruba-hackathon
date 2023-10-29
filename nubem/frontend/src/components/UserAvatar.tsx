import Avatar from "@mui/material/Avatar";
import stringToColor from "string-to-color";

type UserAvatarProps = {
  firstName?: string;
  lastName?: string;
  size?: number;
};

function stringAvatar(firstName: string, lastName: string, size: number) {
  return {
    sx: {
      bgcolor: stringToColor(firstName + lastName),
      width: size,
      height: size,
      fontSize: size / 2,
    },
    children: `${firstName?.[0]}${lastName[0]}`,
  };
}

const UserAvatar: React.FC<UserAvatarProps> = ({ firstName, lastName, size = 40 }) => {
  if (!firstName || !lastName) return <Avatar sx={{ width: size, height: size }} />;
  return <Avatar {...stringAvatar(firstName, lastName, size)} />;
};

export default UserAvatar;
