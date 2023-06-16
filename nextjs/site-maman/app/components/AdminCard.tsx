import React, { ReactNode } from "react";
import Button from "./Button";
import { MdEdit, MdOutlineDelete } from "react-icons/md";

interface AdminCardProps {
  children: ReactNode;
  onEdit: () => void;
  onDelete: () => void;
}

const AdminCard: React.FC<AdminCardProps> = ({
  children,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-neutral-100 text-lg text-neutral-700 grid grid-cols-3 rounded-lg py-2 px-4">
      <div className="col-span-2">{children}</div>
      <div className="flex flex-row gap-6">
        <Button label="modifier" icon={MdEdit} reduceIcon onClick={onEdit} />
        <Button
          label="supprimer"
          icon={MdOutlineDelete}
          reduceIcon
          onClick={onDelete}
        />
      </div>
    </div>
  );
};

export default AdminCard;
