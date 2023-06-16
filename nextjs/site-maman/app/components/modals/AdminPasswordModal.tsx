"use client";

import { useRouter } from "next/navigation";
import Modal from "./Modal";
import { useCallback, useState } from "react";
import useAdminPasswordModal, {
  AdminPasswordModalFormValues,
  adminPasswordModalDefaultValues,
} from "@/app/hooks/useAdminPasswordModal";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import Input from "../inputs/Input";

const AdminPasswordModal = () => {
  const router = useRouter();
  const adminPasswordModal = useAdminPasswordModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<AdminPasswordModalFormValues>({
    defaultValues: adminPasswordModalDefaultValues,
  });

  const onClose = useCallback(() => {
    adminPasswordModal.onClose();
    reset();
  }, [adminPasswordModal, reset]);

  const onSubmit: SubmitHandler<AdminPasswordModalFormValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/checkpass", { password: data.password })
      .then((res) => {
        const msg = res.data.message;
        if (msg === "OK") router.push("/admin/sondages");
        else throw Error("wrong password");
      })
      .catch((e) => {
        toast.error(e.message);
      })
      .finally(() => {
        onClose();
        setIsLoading(false);
      });
  };

  const adminPasswordModalBody = (
    <div>
      <Input
        errors={errors}
        label="Password"
        id="password"
        type="password"
        register={register}
        required
      />
    </div>
  );

  return (
    <Modal
      isOpen={adminPasswordModal.isOpen}
      disabled={isLoading}
      body={adminPasswordModalBody}
      onClose={adminPasswordModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel="Confirmer"
    />
  );
};

export default AdminPasswordModal;
