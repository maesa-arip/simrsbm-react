import Container from "@/Components/Container";
import ThirdButton from "@/Components/ThirdButton";
import App from "@/Layouts/App";
import { Head, Link, router } from "@inertiajs/react";
import { debounce, pickBy } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import { usePermission } from "@/Composables/Permission";
import { IconMan, IconMoodSmile, IconWoman } from "@tabler/icons-react";
import Badge from "@/Components/Badge";
const { hasRole } = usePermission();
const { hasPermission } = usePermission();

const UpIcon = () => (
    <svg
        className="w-5 h-5 text-gray-500"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fillRule="evenodd"
            d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
            clipRule="evenodd"
        />
    </svg>
);
const DownIcon = () => (
    <svg
        className="w-5 h-5 text-gray-500"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
        />
    </svg>
);
export default function Index(props) {
    const {
        data: VW_DataPasienReg,
        meta,
        filtered,
        attributes,
    } = props.VW_DataPasienReg;
    const [pageNumber, setPageNumber] = useState([]);
    const [params, setParams] = useState(filtered);
    const [isOpenAddDialog, setIsOpenAddDialog] = useState(false);
    const [isOpenEditDialog, setIsOpenEditDialog] = useState(false);
    const [isOpenDestroyDialog, setIsOpenDestroyDialog] = useState(false);
    const [enabled, setEnabled] = useState(false);
    const [state, setState] = useState([]);
    const [isInitialRender, setIsInitialRender] = useState(true);

    var curr = new Date();
    curr.setDate(curr.getDate());
    var date = curr.toISOString().substring(0, 10);
console.log(window.location.href)
    const reload = useCallback(
        debounce((query) => {
            router.get(
                window.location.href,
                { ...pickBy(query), page: query.page },
                {
                    preserveState: true,
                    preserveScroll: true,
                }
            );
        }, 150),
        []
    );
    useEffect(() => {
        if (!isInitialRender) {
            reload(params);
        } else {
            setIsInitialRender(false);
        }
    }, [params]);
    useEffect(() => {
        let numbers = [];
        for (
            let i = attributes.per_page;
            i < attributes.total / attributes.per_page;
            i = i + attributes.per_page
        ) {
            numbers.push(i);
        }
        setPageNumber(numbers);
    }, []);
    const onChange = (event) => {
        const updatedParams = {
            ...params,
            [event.target.name]: event.target.value,
            page: 1, // Set page number to 1
        };
        setParams(updatedParams);
    };
    const sort = (item) => {
        setParams({
            ...params,
            field: item,
            direction: params.direction == "asc" ? "desc" : "asc",
        });
    };

    // CRUD
    const [selectedRow, setSelectedRow] = useState(null);
    const [editingRow, setEditingRow] = useState(null);
    const selectRow = (index) => {
        if (selectedRow === index) {
            setSelectedRow(null);
        } else {
            setSelectedRow(index);
        }
    };

    // END CRUD
    return (
        <>
            <Head title="Rawat Jalan" />

            <Container>
                <div className="p-1 space-x-4 overflow-x-auto bg-white rounded md:flex whitespace-nowrap">
                    <button
                        className={`w-32 md:w-full rounded py-2.5 text-sm font-medium leading-5 transition-all duration-300 ${
                            params.jenis == "semuadata"
                                ? "bg-blue-300 ring-blue-300"
                                : "bg-gray-300 ring-gray-300"
                        } text-white ring-2  ring-opacity-60 ring-offset-2 ring-offset-white focus:outline-none focus:ring-2`}
                        type="button"
                        name="jenis"
                        value={"semuadata"}
                        onClick={onChange}
                    >
                        Semua Data
                    </button>
                    <button
                        className={`w-32 md:w-full rounded py-2.5 text-sm font-medium leading-5 transition-all duration-300 ${
                            params.jenis == "belumperiksa"
                                ? "bg-blue-300 ring-blue-300"
                                : "bg-gray-300 ring-gray-300"
                        } text-white ring-2  ring-opacity-60 ring-offset-2 ring-offset-white focus:outline-none focus:ring-2`}
                        type="button"
                        name="jenis"
                        value={"belumperiksa"}
                        onClick={onChange}
                    >
                        Belum Periksa
                    </button>
                    <button
                        className={`w-32 md:w-full rounded py-2.5 text-sm font-medium leading-5 transition-all duration-300 ${
                            params.jenis == "sudahperiksa"
                                ? "bg-blue-300 ring-blue-300"
                                : "bg-gray-300 ring-gray-300"
                        } text-white ring-2  ring-opacity-60 ring-offset-2 ring-offset-white focus:outline-none focus:ring-2`}
                        type="button"
                        name="jenis"
                        value={"sudahperiksa"}
                        onClick={onChange}
                    >
                        Sudah Periksa
                    </button>
                    <button
                        className={`w-32 md:w-full rounded py-2.5 text-sm font-medium leading-5 transition-all duration-300 ${
                            params.jenis == "reservasi"
                                ? "bg-blue-300 ring-blue-300"
                                : "bg-gray-300 ring-gray-300"
                        } text-white ring-2  ring-opacity-60 ring-offset-2 ring-offset-white focus:outline-none focus:ring-2`}
                        type="button"
                        name="jenis"
                        value={"reservasi"}
                        onClick={onChange}
                    >
                        Reservasi
                    </button>
                </div>

                <div className="flex items-center justify-between mb-2">
                    <div className="w-1/2">
                        <div className="flex items-center justify-start mt-2 mb-0 gap-x-1">
                            {/* <ThirdButton
                                color="sky"
                                type="button"
                                onClick={openAddDialog}
                            >
                                Periksa
                            </ThirdButton>
                            <ThirdButton
                                color={selectedRow === null ? "gray" : "red"}
                                type="button"
                                className={`${
                                    selectedRow === null
                                        ? "cursor-not-allowed"
                                        : ""
                                }`}
                                onClick={() => {
                                    if (selectedRow !== null) {
                                        const selected = VW_DataPasienReg[selectedRow];
                                        openDestroyDialog(selected);
                                    }
                                }}
                                disabled={selectedRow === null}
                            >
                                Hapus
                            </ThirdButton>
                            <ThirdButton
                                color={selectedRow === null ? "gray" : "cyan"}
                                type="button"
                                className={`${
                                    selectedRow === null
                                        ? "cursor-not-allowed"
                                        : ""
                                }`}
                                onClick={() => {
                                    if (selectedRow !== null) {
                                        const selected = VW_DataPasienReg[selectedRow];
                                        openEditDialog(selected);
                                    }
                                }}
                                disabled={selectedRow === null}
                            >
                                Edit
                            </ThirdButton> */}
                        </div>
                    </div>
                    <div className="w-1/2">
                        <div className="flex items-center justify-end mt-4 mb-0 gap-x-1">
                            <InputLabel htmlFor="Periode" value="Periode" />
                            {/* <input id="dateRequired" type="date" name="dateRequired" defaultValue={date} /> */}
                            <TextInput
                                type="date"
                                id="startdate"
                                name="startdate"
                                defaultValue={date}
                                className="block w-1/4 "
                                autoComplete="startdate"
                                onChange={onChange}
                                isFocused={true}
                                required
                            />
                            <InputLabel htmlFor="Sampai" value="Sampai" />
                            <TextInput
                                type="date"
                                id="enddate"
                                name="enddate"
                                defaultValue={date}
                                className="block w-1/4 "
                                autoComplete="enddate"
                                isFocused={true}
                                onChange={onChange}
                                required
                            />
                            {/* <TextInputCheckbox name="all"/> */}
                            <select
                                name="load"
                                id="load"
                                onChange={onChange}
                                value={params.load}
                                className="transition duration-150 ease-in-out border-gray-300 rounded focus:ring-blue-200 focus:ring form-select"
                            >
                                {pageNumber.map((page, index) => (
                                    <option key={index}>{page}</option>
                                ))}
                            </select>
                            <div className="flex items-center px-2 transition duration-150 ease-in-out bg-white border border-gray-300 rounded gap-x-2 focus-within:border-blue-400 focus-within:ring-blue-200 focus-within:ring">
                                <svg
                                    className="inline w-5 h-5 text-gray-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                                <input
                                    type="text"
                                    autoComplete="off"
                                    name="q"
                                    id="q"
                                    onChange={onChange}
                                    value={params.q}
                                    className="w-full border-0 focus:ring-0 form-text"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* <Table>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th params={params}>#</Table.Th>
                                <Table.Th
                                    name="name"
                                    onClick={() =>
                                        sort("name")
                                    }
                                    params={params}
                                >
                                    Name
                                </Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {VW_DataPasienReg.map((patient, index) => (
                                <Table.Tr key={index}>
                                    <Table.Td>{meta.from + index}</Table.Td>
                                    <Table.Td>{patient.name}</Table.Td>
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
                    </Table> */}

                <div className="flex flex-col p-1 overflow-x-auto">
                    <div className="rounded">
                        <div className="inline-block w-full py-2 align-middle">
                            <div className="border border-gray-200 rounded">
                                <table className="w-full divide-y divide-gray-200 table-auto">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-xs font-semibold tracking-normal text-left text-gray-800 uppercase"
                                            >
                                                <div className="flex items-center cursor-pointer gap-x-1">
                                                    #
                                                </div>
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-xs font-semibold tracking-normal text-left text-gray-800 uppercase"
                                            >
                                                <div
                                                    className="flex items-center cursor-pointer gap-x-1"
                                                    onClick={() =>
                                                        sort("NamaPasien")
                                                    }
                                                >
                                                    No Urut
                                                    {params.field ==
                                                        "NamaPasien" &&
                                                        params.direction ==
                                                            "asc" && <UpIcon />}
                                                    {params.field ==
                                                        "NamaPasien" &&
                                                        params.direction ==
                                                            "desc" && (
                                                            <DownIcon />
                                                        )}
                                                </div>
                                            </th>
                                            
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-xs font-semibold tracking-normal text-left text-gray-800 uppercase"
                                            >
                                                <div
                                                    className="flex items-center cursor-pointer gap-x-1"
                                                    onClick={() =>
                                                        sort("NamaPasien")
                                                    }
                                                >
                                                    NoReg
                                                    {params.field ==
                                                        "NamaPasien" &&
                                                        params.direction ==
                                                            "asc" && <UpIcon />}
                                                    {params.field ==
                                                        "NamaPasien" &&
                                                        params.direction ==
                                                            "desc" && (
                                                            <DownIcon />
                                                        )}
                                                </div>
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-xs font-semibold tracking-normal text-left text-gray-800 uppercase"
                                            >
                                                <div
                                                    className="flex items-center cursor-pointer gap-x-1"
                                                    onClick={() =>
                                                        sort("NamaPasien")
                                                    }
                                                >
                                                    Tanggal
                                                    {params.field ==
                                                        "NamaPasien" &&
                                                        params.direction ==
                                                            "asc" && <UpIcon />}
                                                    {params.field ==
                                                        "NamaPasien" &&
                                                        params.direction ==
                                                            "desc" && (
                                                            <DownIcon />
                                                        )}
                                                </div>
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-xs font-semibold tracking-normal text-left text-gray-800 uppercase"
                                            >
                                                <div
                                                    className="flex items-center cursor-pointer gap-x-1"
                                                    onClick={() =>
                                                        sort("NamaPasien")
                                                    }
                                                >
                                                    Nama
                                                    {params.field ==
                                                        "NamaPasien" &&
                                                        params.direction ==
                                                            "asc" && <UpIcon />}
                                                    {params.field ==
                                                        "NamaPasien" &&
                                                        params.direction ==
                                                            "desc" && (
                                                            <DownIcon />
                                                        )}
                                                </div>
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-xs font-semibold tracking-normal text-left text-gray-800 uppercase"
                                            >
                                                <div
                                                    className="flex items-center cursor-pointer gap-x-1"
                                                    onClick={() =>
                                                        sort("NamaPasien")
                                                    }
                                                >
                                                    NRM
                                                    {params.field ==
                                                        "NamaPasien" &&
                                                        params.direction ==
                                                            "asc" && <UpIcon />}
                                                    {params.field ==
                                                        "NamaPasien" &&
                                                        params.direction ==
                                                            "desc" && (
                                                            <DownIcon />
                                                        )}
                                                </div>
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-xs font-semibold tracking-normal text-left text-gray-800 uppercase"
                                            >
                                                <div
                                                    className="flex items-center cursor-pointer gap-x-1"
                                                    onClick={() =>
                                                        sort("NamaPasien")
                                                    }
                                                >
                                                    Tipe Pasien
                                                    {params.field ==
                                                        "NamaPasien" &&
                                                        params.direction ==
                                                            "asc" && <UpIcon />}
                                                    {params.field ==
                                                        "NamaPasien" &&
                                                        params.direction ==
                                                            "desc" && (
                                                            <DownIcon />
                                                        )}
                                                </div>
                                            </th>
                                            
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-xs font-semibold tracking-normal text-left text-gray-800 uppercase"
                                            >
                                                <div
                                                    className="flex items-center cursor-pointer gap-x-1"
                                                    onClick={() =>
                                                        sort("NamaPasien")
                                                    }
                                                >
                                                    Dokter
                                                    {params.field ==
                                                        "NamaPasien" &&
                                                        params.direction ==
                                                            "asc" && <UpIcon />}
                                                    {params.field ==
                                                        "NamaPasien" &&
                                                        params.direction ==
                                                            "desc" && (
                                                            <DownIcon />
                                                        )}
                                                </div>
                                            </th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {VW_DataPasienReg.map(
                                            (patient, index) => (
                                                <tr
                                                    key={index}
                                                    className={
                                                        selectedRow === index
                                                            ? "bg-sky-100  cursor-pointer"
                                                            : "cursor-pointer"
                                                    }
                                                >
                                                    <td
                                                        className="px-6 py-4 text-sm font-normal tracking-normal whitespace-nowrap"
                                                        onClick={() =>
                                                            selectRow(index)
                                                        }
                                                    >
                                                        <Badge>R</Badge>
                                                        {/* <Badge color="red">B</Badge> */}
                                                        <Badge color="cyan">P</Badge>
                                                        <Badge color="yellow">K</Badge>
                                                        </td>
                                                    <td className="px-6 py-4 text-sm font-normal tracking-normal whitespace-nowrap">
                                                        {patient.NoUrutSection}
                                                    </td>
                                                    {/* <td className="px-6 py-4 text-sm font-normal tracking-normal whitespace-nowrap">
                                                        {patient.NoUrutSection}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-normal tracking-normal whitespace-nowrap">
                                                        Belum Dipanggil
                                                    </td> */}
                                                    <td className="flex items-center px-6 py-4 text-sm font-normal tracking-normal whitespace-nowrap">
                                                        {patient.StatusBayar == 'Sudah Bayar' ? <Badge color="yellow"><IconMoodSmile className="w-4 h-4"/></Badge>  :""}{patient.NoReg}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-normal tracking-normal whitespace-nowrap">
                                                        {patient.Tanggal} [{" "}
                                                        {patient.Jam} ]
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-normal tracking-normal whitespace-nowrap">
                                                        {patient.NamaPasien}
                                                    </td>
                                                    <td className="flex px-6 py-4 text-sm font-normal tracking-normal whitespace-nowrap">
                                                        {patient.JenisKelamin ==
                                                        "M" ? (
                                                            <IconMan className="w-4 h-4 mr-2 text-blue-400" />
                                                        ) : (
                                                            <IconWoman className="w-4 h-4 mr-2 text-pink-400" />
                                                        )}
                                                        {patient.NRM}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-normal tracking-normal whitespace-nowrap">
                                                        {patient.JenisPasien}
                                                    </td>
                                                    {/* <td className="px-6 py-4 text-sm font-normal tracking-normal whitespace-nowrap">
                                                        {patient.JenisKelamin}
                                                    </td> */}
                                                    <td className="px-6 py-4 text-sm font-normal tracking-normal whitespace-nowrap">
                                                        {patient.NamaDOkter}
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            {/* <Pagination meta={meta} /> */}
                            <ul className="flex items-center mt-4 gap-x-1">
                                {meta.links.map((item, index) => (
                                    <button
                                        key={index}
                                        disabled={
                                            item.url == null ? true : false
                                        }
                                        className={`${
                                            item.url == null
                                                ? "text-gray-500"
                                                : "text-gray-800"
                                        } w-12 h-9 rounded flex items-center justify-center border bg-white`}
                                        onClick={() =>
                                            setParams({
                                                ...params,
                                                page: new URL(
                                                    item.url
                                                ).searchParams.get("page"),
                                            })
                                        }
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}
Index.layout = (page) => <App children={page} />;
