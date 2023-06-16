import useReserveRdvModal, {
  ReserveRdvModalFormValues,
  reserveRdvModalDefaultValues,
} from "@/app/hooks/useReserveRdvModal";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Modal from "../modals/Modal";
import Heading from "../Heading";
import axios from "axios";
import { toast } from "react-hot-toast";
import Input from "../inputs/Input";

const ReserveRdvModal = ({
  updater,
}: {
  updater: (action: string, id: string, data: any) => void;
}) => {
  const reserveRdvModal = useReserveRdvModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    register,
    //reset,
    formState: { errors },
  } = useForm<ReserveRdvModalFormValues>({
    defaultValues: reserveRdvModalDefaultValues,
  });

  const onSubmit: SubmitHandler<ReserveRdvModalFormValues> = async (data) => {
    setIsLoading(true);
    const update = {
      student: data.student,
    };
    axios
      .patch(`/api/rdvs/${reserveRdvModal.rdv.id}`, update)
      .then((_) => {
        updater("change", "", update);
        reserveRdvModal.onClose();
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title={`Réservation pour le rendez-vous de ${reserveRdvModal.rdv.hour
          }h${reserveRdvModal.rdv.minute.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}`}
        subtitle="Vous assistez au rendez-vous pour :"
      />
      <Input
        id="student"
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
      isOpen={reserveRdvModal.isOpen}
      title="Réservation"
      actionLabel="Réserver"
      onClose={reserveRdvModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default ReserveRdvModal;
