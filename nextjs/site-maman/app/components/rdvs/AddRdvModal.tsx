"use client";

import useAddRdvModal, {
  AddRdvModalFormValues,
  addRdvModalDefaultValues,
} from "@/app/hooks/useAddRdvModal";

import axios from "axios";
import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Heading from "../Heading";
import Modal from "../modals/Modal";
import TimeInput from "../inputs/TimeInput";
import Checkbox from "../inputs/Checkbox";

const AddRdvModal = ({ refresh }: { refresh: () => void }) => {
  const addRdvModal = useAddRdvModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<AddRdvModalFormValues>({
    defaultValues: addRdvModalDefaultValues,
  });

  const onClose = useCallback(() => {
    addRdvModal.onClose();
    reset(addRdvModalDefaultValues);
  }, [addRdvModal.onClose, reset]);

  const onSubmit: SubmitHandler<AddRdvModalFormValues> = async (data) => {
    setIsLoading(true);
    let newRdv = {
      hour: Number(data.hour),
      minute: Number(data.minute),
      student: "FREE",
    };
    if (data.inactive) newRdv.student = "NONE";
    // do stuff
    axios
      .post("/api/rdvs", newRdv)
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
        title="Ajout d'horaire"
        subtitle="Ajouter un horaire pour un rendez-vous"
      />
      <TimeInput register={register} errors={errors} disabled={isLoading} />
      <Checkbox
        id="inactive"
        label="Inactif"
        register={register}
        errors={errors}
        disabled={isLoading}
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={addRdvModal.isOpen}
      title="Ajouter rdv"
      actionLabel="Ajouter"
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default AddRdvModal;
