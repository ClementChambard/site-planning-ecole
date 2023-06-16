"use client";

import useAddRollerModal, {
  AddRollerModalFormValues,
  addRollerModalDefaultValues,
} from "@/app/hooks/useAddRollerModal";

import axios from "axios";
import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Heading from "../Heading";
import Modal from "../modals/Modal";
import Input from "../inputs/Input";

const AddRollerModal = ({ refresh }: { refresh: () => void }) => {
  const addRollerModal = useAddRollerModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<AddRollerModalFormValues>({
    defaultValues: addRollerModalDefaultValues,
  });

  const onClose = useCallback(() => {
    addRollerModal.onClose();
    reset(addRollerModalDefaultValues);
  }, [addRollerModal, reset]);

  const onSubmit: SubmitHandler<AddRollerModalFormValues> = async (data) => {
    setIsLoading(true);
    let newRoller = {
      student: data.student,
    };
    axios
      .post("/api/rollers", newRoller)
      .then((_) => {
        refresh();
        onClose();
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Ajout d'élève"
        subtitle="Ajouter un élève pour le sondage des rollers"
      />
      <Input
        label="Nom"
        id="student"
        register={register}
        errors={errors}
        disabled={isLoading}
        required
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={addRollerModal.isOpen}
      title="Ajouter élève"
      actionLabel="Ajouter"
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default AddRollerModal;
