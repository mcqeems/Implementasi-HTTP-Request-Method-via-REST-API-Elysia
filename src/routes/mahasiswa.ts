import Elysia, { t } from "elysia";
import { mahasiswa } from "../contents/mahasiswa";

export const mahasiswaRoute = new Elysia({
  prefix: "/mahasiswa",
});

const params = t.Object({ id: t.Numeric() });
const body = t.Object({
  nama: t.String(),
  umur: t.Number(),
  jurusan: t.String(),
});
const patchBody = t.Object({
  nama: t.Optional(t.String()),
  umur: t.Optional(t.Number()),
  jurusan: t.Optional(t.String()),
});

mahasiswaRoute.get("/", () => {
  return mahasiswa;
});

mahasiswaRoute.get(
  "/:id",
  ({ params, status }) => {
    const findMahasiswa = mahasiswa.find((mhs) => mhs.id === params.id);
    if (!findMahasiswa) return status(404, { message: "Mahasiswa not found" });
    return findMahasiswa;
  },
  { params },
);

mahasiswaRoute.post(
  "/:id",
  ({ params, body, status }) => {
    if (mahasiswa.some((mhs) => mhs.id === params.id))
      return status(409, { message: "Mahasiswa already exists" });
    const created = { id: params.id, ...body };
    mahasiswa.push(created);
    return status(201, created);
  },
  { params, body },
);

mahasiswaRoute.put(
  "/:id",
  ({ params, body, status }) => {
    const index = mahasiswa.findIndex((mhs) => mhs.id === params.id);
    if (index === -1) return status(404, { message: "Mahasiswa not found" });
    mahasiswa[index] = { id: params.id, ...body };
    return mahasiswa[index];
  },
  { params, body },
);

mahasiswaRoute.patch(
  "/:id",
  ({ params, body, status }) => {
    const index = mahasiswa.findIndex((mhs) => mhs.id === params.id);
    if (index === -1) return status(404, { message: "Mahasiswa not found" });
    mahasiswa[index] = { ...mahasiswa[index], ...body };
    return mahasiswa[index];
  },
  { params, body: patchBody },
);

mahasiswaRoute.delete(
  "/:id",
  ({ params, status }) => {
    const index = mahasiswa.findIndex((mhs) => mhs.id === params.id);
    if (index === -1) return status(404, { message: "Mahasiswa not found" });
    const [deleted] = mahasiswa.splice(index, 1);
    return deleted;
  },
  { params },
);
