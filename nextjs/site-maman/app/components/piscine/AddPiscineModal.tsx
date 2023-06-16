"use client";

import useAddPiscineModal, {
  AddPiscineModalFormValues,
  addPiscineModalDefaultValues,
} from "@/app/hooks/useAddPiscineModal";

import axios from "axios";
import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Heading from "../Heading";
import Modal from "../modals/Modal";
import Input from "../inputs/Input";

const AddPiscineModal = ({ refresh }: { refresh: () => void }) => {
  const addPiscineModal = useAddPiscineModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<AddPiscineModalFormValues>({
    defaultValues: addPiscineModalDefaultValues,
  });

  const onClose = useCallback(() => {
    addPiscineModal.onClose();
    reset(addPiscineModalDefaultValues);
  }, [reset, addPiscineModal]);

  const onSubmit: SubmitHandler<AddPiscineModalFormValues> = async (data) => {
    setIsLoading(true);
    axios
      .post("/api/piscine", data)
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
        title="Ajout de scéance"
        subtitle="Ajouter une date de scéance piscine"
      />
      <Input
        label="Date"
        id="date"
        type="date"
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={addPiscineModal.isOpen}
      title="Ajouter date piscine"
      actionLabel="Ajouter"
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default AddPiscineModal;
