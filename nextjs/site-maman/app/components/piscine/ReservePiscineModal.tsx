import useReservePiscineModal, {
  ReservePiscineModalFormValues,
  reservePiscineModalDefaultValues,
} from "@/app/hooks/useReservePiscineModal";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Modal from "../modals/Modal";
import Heading from "../Heading";
import axios from "axios";
import { toast } from "react-hot-toast";
import Input from "../inputs/Input";

const ReservePiscineModal = ({
  updater,
}: {
  updater: (action: string, id: string, data: any) => void;
}) => {
  const reservePiscineModal = useReservePiscineModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    register,
    //reset,
    formState: { errors },
  } = useForm<ReservePiscineModalFormValues>({
    defaultValues: reservePiscineModalDefaultValues,
  });

  const onSubmit: SubmitHandler<ReservePiscineModalFormValues> = async (
    data
  ) => {
    setIsLoading(true);
    axios
      .patch(`/api/piscine/${reservePiscineModal.piscine.id}`, data)
      .then((_) => {
        updater("", "", 1);
        reservePiscineModal.onClose();
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Reservation pour la piscine"
        subtitle="Entrez votre nom :"
      />
      <Input
        id="parent"
        label="Nom"
        register={register}
        disabled={isLoading}
        errors={errors}
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={reservePiscineModal.isOpen}
      title="Réservation"
      actionLabel="Réserver"
      onClose={reservePiscineModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default ReservePiscineModal;
