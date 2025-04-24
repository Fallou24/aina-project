"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, UserPlus, Pencil } from "lucide-react";
import Image from "next/image";

export default function ProfilActions() {
  const [openModal, setOpenModal] = useState<
    "beneficiaire" | "aidant" | "profil" | null
  >(null);

  const close = () => setOpenModal(null);

  return (
    <div className="mt-6 p-6">
      <div className="w-[200px] h-[200px]">
        <Image
          src="/doctor.jpg"
          alt="doctor image"
          width={200}
          height={200}
          style={{ objectFit: "contain", borderRadius: "100%" }}
        />
      </div>
      <h1 className="font-medium text-2xl mb-5">Docteur Mouhamed</h1>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        <Button variant="outline" onClick={() => setOpenModal("beneficiaire")}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Ajouter bénéficiaire
        </Button>

        <Button variant="outline" onClick={() => setOpenModal("aidant")}>
          <UserPlus className="mr-2 h-4 w-4" />
          Ajouter aidant
        </Button>

        <Button variant="default" onClick={() => setOpenModal("profil")}>
          <Pencil className="mr-2 h-4 w-4" />
          Modifier profil
        </Button>
      </div>

      {/* Modal Bénéficiaire */}
      <Dialog open={openModal === "beneficiaire"} onOpenChange={close}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter un bénéficiaire</DialogTitle>
          </DialogHeader>
          <FormBeneficiaire onClose={close} />
        </DialogContent>
      </Dialog>

      {/* Modal Aidant */}
      <Dialog open={openModal === "aidant"} onOpenChange={close}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter une personne aidante</DialogTitle>
          </DialogHeader>
          <FormAidant onClose={close} />
        </DialogContent>
      </Dialog>

      {/* Modal Modifier Profil */}
      <Dialog open={openModal === "profil"} onOpenChange={close}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier mon profil</DialogTitle>
          </DialogHeader>
          <FormProfil onClose={close} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function FormBeneficiaire({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div className="space-y-3">
        <div>
          <Label>Nom</Label>
          <Input placeholder="Ex: Marie Dupont" />
        </div>
        <div>
          <Label>Date de naissance</Label>
          <Input type="date" />
        </div>
        <div>
          <Label>Email</Label>
          <Input type="email" />
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Annuler
        </Button>
        <Button
          onClick={() => {
            alert("Bénéficiaire ajouté");
            onClose();
          }}
        >
          Ajouter
        </Button>
      </DialogFooter>
    </>
  );
}

function FormAidant({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div className="space-y-3">
        <div>
          <Label>Nom</Label>
          <Input placeholder="Ex: Paul Martin" />
        </div>
        <div>
          <Label>Lien avec bénéficiaire</Label>
          <Input placeholder="Ex: Fils, infirmier..." />
        </div>
        <div>
          <Label>Téléphone</Label>
          <Input />
        </div>
        <div>
          <Label>Email</Label>
          <Input type="email" />
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Annuler
        </Button>
        <Button
          onClick={() => {
            alert("Aidant ajouté");
            onClose();
          }}
        >
          Ajouter
        </Button>
      </DialogFooter>
    </>
  );
}

function FormProfil({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div className="space-y-3">
        <div>
          <Label>Nom complet</Label>
          <Input defaultValue="Jean Consultant" />
        </div>
        <div>
          <Label>Email</Label>
          <Input type="email" defaultValue="jean@mail.com" />
        </div>
        <div>
          <Label>Mot de passe</Label>
          <Input type="password" />
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Annuler
        </Button>
        <Button
          onClick={() => {
            alert("Profil modifié");
            onClose();
          }}
        >
          Enregistrer
        </Button>
      </DialogFooter>
    </>
  );
}
