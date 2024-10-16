import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
} from "./table";

type TableComponentProps<T> = {
  columns: ColumnDef<T>[];
  data: T[];
  caption?: string;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const TableComponent = <T,>({
  columns,
  data,
  caption,
  currentPage,
  totalPages,
  onPageChange,
}: TableComponentProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      sorting: [],
    },
  });

  const handlePreviousPage = () => {
    if (currentPage > 0) onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) onPageChange(currentPage + 1);
  };

  return (
    <div className="w-full overflow-x-auto max-w-[360px] md:max-w-none">
      <Table className="min-w-full border border-gray-200 bg-white">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className="px-4 py-2 text-sm text-gray-700 border-b"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={columns.length}>
              <div className="flex items-center justify-between px-4 py-2 text-sm text-gray-500">
                <span>Total de registros: {data.length}</span>

                <div className="flex items-center space-x-2">
                  <FaChevronLeft
                    onClick={handlePreviousPage}
                    className={`cursor-pointer ${
                      currentPage === 0 ? "opacity-50 pointer-events-none" : ""
                    }`}
                  />
                  <span>
                    {currentPage + 1} de {totalPages}
                  </span>
                  <FaChevronRight
                    onClick={handleNextPage}
                    className={`cursor-pointer ${
                      currentPage === totalPages - 1
                        ? "opacity-50 pointer-events-none"
                        : ""
                    }`}
                  />
                </div>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default TableComponent;