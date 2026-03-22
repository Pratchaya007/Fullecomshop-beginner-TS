import { createCategory, deleteCategory } from "@/api/Categorys";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useEcomStore } from "@/stores/ecom-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FiEdit } from "react-icons/fi";
import { IoTrashBinSharp } from "react-icons/io5";

const Schemascategory = z.object({
  name: z.coerce.string().min(1, "กรุณากรอกข้อมูลที่ต้องการเพิ่มได้เลย"),
});

type categoryInput = z.infer<typeof Schemascategory>;

const FormCategory = () => {
  const token = useEcomStore((state) => state.token);
  // const [category, setCategory] = useState([]);
  const category = useEcomStore((state) => state.categories)
  const getCategory = useEcomStore((state) => state.getCategory)

  //ควบคุมการทำงานในการเรียกข้อมูล
  useEffect(() => {
    if (token) {
      getCategory(token);
    }
  }, [token]);

  //get category
  // const getCategory = async (token: string) => {
  //   try {
  //     const res = await listCategory(token);
  //     // console.log(res);
  //     setCategory(res.data.data); //ต้องไล่การเข้าถึงข้อมูลดีๆในการ set ลงไป
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // UseForm
  const {
    register,
    handleSubmit,
    reset,   // reset,  ⭐ เพิ่ม
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(Schemascategory) });

  // onSubmit
  const onSubmit: SubmitHandler<categoryInput> = async (data) => {
    // if (!token){
    //   toast.error("No token found")
    //   return
    // }
    try {
      await createCategory(token!, data);
      console.log(data);
      toast.success(`Add Category ${data.name} success!!!!`);
      reset() // ⭐ reset input
      getCategory(token!); // เรียกให้มีการรีเซ็ทข้อมูลอีกครั้ง
    } catch {
      toast.error("Invalid create Category!!!");
    }
  };

  //DeleteCategory (token , id )
  const handleRemove = async (id:number) => {
    // console.log(id)
    try{
      const res = await deleteCategory(token , id )
      console.log(res)
      getCategory(token!)
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className="sm:max-w-xl md:max-w-2xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field orientation="horizontal">
          <Input
            type="search"
            placeholder="Create Category..."
            {...register("name")}
          />
          <Button>{isSubmitting ? "loading" : "create"}</Button>
        </Field>
        {errors.name && (
          <p className="text-rose-500 text-[10px] px-3">
            {errors.name.message}
          </p>
        )}
      </form>
      <div className="mt-5">
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader className="">
            <TableRow className="">
              <TableHead>Product list</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {category.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-extralight">
                  {invoice.name}
                </TableCell>
                <TableCell className="text-right ">
                  <div className="flex gap-2.5 justify-end">
                    <div>
                      <FiEdit />
                    </div>
                    <div>
                      <IoTrashBinSharp onClick={() => handleRemove(invoice.id)}/>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell className="text-right">{category.length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};
export default FormCategory;
