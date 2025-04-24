"use client"

import {
  Card, CardContent, CardHeader, CardTitle,
} from "@/components/ui/card"
import { useParams } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { Search } from "lucide-react"

type Aidant = {
  id: string
  nom: string
  lien: string
  telephone: string
  email: string
}

export default function PatientPage() {
  const { id } = useParams()
  const [search, setSearch] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const [aidants, setAidants] = useState<Aidant[]>([
    {
      id: "1",
      nom: "Jean Dupuis",
      lien: "Père",
      telephone: "0612345678",
      email: "jean@mail.com"
    },
    {
      id: "2",
      nom: "Claire Dubois",
      lien: "Infirmière",
      telephone: "0699887766",
      email: "claire@mail.com"
    }
  ])

  const [form, setForm] = useState<Aidant>({
    id: "",
    nom: "",
    lien: "",
    telephone: "",
    email: ""
  })

  const handleOpen = () => {
    setForm({
      id: crypto.randomUUID(),
      nom: "",
      lien: "",
      telephone: "",
      email: ""
    })
    setIsOpen(true)
  }

  const handleSubmit = () => {
    setAidants(prev => [...prev, form])
    setIsOpen(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const filteredAidants = aidants.filter(a =>
    a.nom.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-6 space-y-6">
      {/* Patient */}
      <Card>
        <CardHeader>
          <CardTitle>Dossier bénéficiaire</CardTitle>
        </CardHeader>
        <CardContent>
          <p><strong>Nom:</strong> Nom Exemple</p>
          <p><strong>Date de naissance:</strong> 01/01/1980</p>
          <p><strong>Email:</strong> patient@email.com</p>
        </CardContent>
      </Card>

      {/* Aidants */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle>Personnes aidantes</CardTitle>
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher par nom"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="max-w-sm"
            />
            <Button size="sm" onClick={handleOpen}>Ajouter</Button>
          </div>
        </CardHeader>

        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Lien</TableHead>
                <TableHead>Téléphone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAidants.length > 0 ? (
                filteredAidants.map(a => (
                  <TableRow key={a.id}>
                    <TableCell>{a.nom}</TableCell>
                    <TableCell>{a.lien}</TableCell>
                    <TableCell>{a.telephone}</TableCell>
                    <TableCell>{a.email}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Modifier</Button>
                        <Button variant="destructive" size="sm" onClick={() =>
                          setAidants(prev => prev.filter(p => p.id !== a.id))
                        }>Supprimer</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    Aucun aidant trouvé
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal ajout */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nouvelle personne aidante</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>Nom</Label>
              <Input name="nom" value={form.nom} onChange={handleChange} />
            </div>
            <div>
              <Label>Lien</Label>
              <Input name="lien" value={form.lien} onChange={handleChange} />
            </div>
            <div>
              <Label>Téléphone</Label>
              <Input name="telephone" value={form.telephone} onChange={handleChange} />
            </div>
            <div>
              <Label>Email</Label>
              <Input name="email" value={form.email} onChange={handleChange} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>Annuler</Button>
            <Button onClick={handleSubmit}>Ajouter</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
