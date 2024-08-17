import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReservedContext, {
  ReservedContextProvider,
} from "../contexts/ReserveContext";
import { motion } from 'framer-motion';
import './Rese.css';
import Swal from 'sweetalert2'

export default function Reserved() {
  return (
    <ReservedContextProvider>
      <ReserveDashboard />
    </ReservedContextProvider>
  );
}

function ReserveDashboard() {
  const { data } = useContext(ReservedContext);

  return (
    <div style={{ maxWidth: '88%', margin: '0 auto' }} className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Datetime</th>
            <th scope="col" className="px-6 py-3">Phone</th>
            <th scope="col" className="px-6 py-3">Disease</th>
            <th scope="col" className="px-6 py-3">Status</th>
            <th scope="col" className="px-6 py-3">Action</th>
            {/* <th scope="col" className="px-6 py-3"><span className="sr-only">Edit</span></th> */}
          </tr>
        </thead>
        <tbody>
          {data && data.map(el => (
            <ReserveItem key={el.id} item={el} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ReserveItem({ item }) {
  const navigate = useNavigate();
  const { updateUserSeenStatus } = useContext(ReservedContext);
  const time = new Date(item.datetime)
  const thaiDate = time.toLocaleDateString('th-TH', {
    month: 'long',
    day: 'numeric',
  });

  const hdlClick = () => {
    navigate('/editresrve/' + item.id);
  };

  useEffect(() => {
    let isUserSeen = null
    if (!item.seen) {
      Swal.fire({
        title: `การจองของวัน ${thaiDate} ถูกยกเลิก!`,
        text: `สาเหตุ: ${item.notes}`,
        icon: "error",
        confirmButtonText: 'ตกลง',
        confirmButtonColor: '#3085d6',
        footer: '<a href="/new">ต้องการจองคิวใหม่ ?</a>'
      }).then((result) => {
        if (result.isConfirmed) {
          isUserSeen = true
          updateUserSeenStatus(item.id, isUserSeen)
        }
      });
    }
  }, [])

  const hdlDetail = () => {
    Swal.fire({
      title: `การจองของวัน ${thaiDate} ถูกยกเลิก!`,
      text: `สาเหตุ: ${item.notes}`,
      icon: "error",
      confirmButtonText: 'ตกลง',
      confirmButtonColor: '#3085d6',
      footer: '<a href="/new">ต้องการจองคิวใหม่ ?</a>'
    });
  }

  return (
    <motion.tr
      className="bg-white border-b hover:bg-gray-50 dark:hover:bg-gray-100"
      initial={{ opacity: 0, y: 20 }} // Initial state
      animate={{ opacity: 1, y: 0 }} // End state
      transition={{ duration: 0.3 }} // Animation duration
    >
      <td className="px-6 py-4">
        {new Date(item.datetime).toUTCString().split("GMT")[0]}
      </td>
      <td className="px-6 py-4">
        {item.phone}
      </td>
      <td className="px-6 py-4">
        {item.disease}
      </td>
      <td className={item.status === 'RESERVED' ? 'text-green-500 px-6 py-4' : item.status === 'CANCELED' ? 'text-red-500 px-6 py-4' : 'px-6 py-4'}>
        {item.status}
      </td>
      <td className="px-6 py-4">
        {item.status === 'RESERVED' ? (
          <button></button>
        ) : item.status === 'CANCELED' ? (
          (
            <button
              onClick={hdlDetail}
              className="button-edit text-red-400 underline"
            >
              Detail
            </button>
          )
        ) : (
          <button
            onClick={hdlClick}
            className="button-edit"
          >
            Edit
          </button>
        )}
      </td>
    </motion.tr>
  );
}
