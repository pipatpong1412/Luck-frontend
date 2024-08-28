import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../contexts/AuthContext';
import ReservedContext from '../contexts/ReserveContext';
import axios from 'axios';

export default function Edit() {

    // const { data } = useContext(ReservedContext)

    // console.log(data);
    const id = window.location.pathname.split('/')[2]
    const [reserved, setReserved] = useState(null)


    useEffect(() => {
        const showBooking = async () => {
            try {
                let token = localStorage.getItem('token')
                if (!token) { return }
                const rs = await axios.get(`http://localhost:8000/booking/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                // console.log(rs.data)
                setReserved(rs.data)

            } catch (error) {
                alert(error);
            }
        };

        showBooking();
    }, [id])

    return (
        <div>
            {reserved && <FormEdit reserved={reserved} />}
        </div>
    )

}
function FormEdit({ reserved }) {
    const { updateBooking, data, doctorUpdateStatusReserved } = useContext(ReservedContext)
    const [time, setTime] = useState(null);
    const [isUpdate, setIsUpdate] = useState(false)
    const [update, setUpdate] = useState({
        datetime: new Date().toLocaleString("th-TH", {
            timeZone: "Asia/Bangkok",
            hour12: false,
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
        }),
        phone: reserved.phone,
        disease: reserved.disease
    })

    const hdlClick = (e) => {
        e.preventDefault()
        setIsUpdate(!isUpdate)
    }

    const hdlCancel = () => {
        setIsUpdate(false)
    }

    const hdlChangeTime = (e) => {
        setTime(e.target.value);
    };

    const hdlChange = (e) => {
        setUpdate(prv => ({ ...prv, [e.target.name]: e.target.value }))
    }

    const hdlSubmit = (e) => {
        e.preventDefault()
        const timedate = update.datetime + 'T' + time + '.000Z';
        // createBooking({ ...input, datetime: timedate });
        // console.log(timedate)
        updateBooking(reserved.id, { ...update, datetime: timedate })
        doctorUpdateStatusReserved(reserved.id, { status: 'PENDING', notes: null })
        setIsUpdate(false)
    }

    const findTime = data?.map(el => el.datetime.split('T')[1].slice(0, 8));
    const findDay = data?.map(el => el.datetime.split('T')[0]);

    return (
        <>
            {isUpdate ? (<div className='max-w-md mx-auto mt-8 bg-pink-100 p-8 rounded shadow-lg'>
                <h2 className='text-2xl font-bold mb-4 text-pink-500'>Edit Information</h2>
                <form onSubmit={hdlSubmit}>
                    {reserved.status === 'CANCELED' && <div className="flex gap-2 w-full">
                        <input
                            type="date"
                            name="datetime"
                            value={update.datetime}
                            onChange={hdlChange}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full bg-gray-200 p-2 rounded-[12px] border border-gray-300 focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-transparent transition-all duration-300 ease-in-out"
                        />
                        <select
                            onChange={hdlChangeTime}
                            className="w-full bg-gray-200 p-2 rounded-[12px] border border-gray-300 focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-transparent transition-all duration-300 ease-in-out"
                        >
                            <option hidden>เลือกเวลา</option>
                            {['09:30:00', '10:30:00', '13:00:00', '14:00:00', '15:00:00', '17:00:00'].map(time => {
                                const disabled = findDay?.includes(update.datetime.split('T')[0]) && findTime?.includes(time);
                                return (
                                    <option key={time} value={time} disabled={disabled}>
                                        {time.slice(0, 5)}
                                    </option>
                                );
                            })}
                        </select>
                    </div>}
                    <div className='mb-4'>
                        <label htmlFor='phone' className='block font-bold mb-2 text-pink-500'>
                            Phone
                        </label>
                        <input
                            onChange={hdlChange}
                            type='text'
                            value={update.phone}
                            name='phone'
                            className='w-full border-2 border-pink-500 p-2 rounded focus:outline-none focus:border-pink-700 text-gray-500'
                        />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='disease' className='block font-bold mb-2 text-pink-500'>
                            Disease
                        </label>
                        <input
                            onChange={hdlChange}
                            type='text'
                            name='disease'
                            value={update.disease}
                            className='w-full border-2 border-pink-500 p-2 rounded focus:outline-none focus:border-pink-700 text-gray-500'
                        />
                    </div>
                    {reserved.status === 'CANCELED' ? (
                        <button
                            type='submit'
                            className='bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none mr-2'
                        >
                            Resubmit
                        </button>
                    ) : (
                        <button
                            type='submit'
                            className='bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none mr-2'
                        >
                            Save
                        </button>
                    )}

                    <button
                        onClick={hdlCancel}
                        type='submit'
                        className='bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none'
                    >
                        Cancel
                    </button>
                </form>
            </div>) : (<div className='max-w-md mx-auto mt-8 bg-pink-100 p-8 rounded shadow-lg'>
                <h2 className='text-2xl font-bold mb-4 text-pink-500'>Edit Reserve</h2>
                <form>
                    {/* <div className="flex gap-2 w-full">
                        <input
                            type="date"
                            name="datetime"
                            value={update.datetime}
                            readOnly
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full bg-gray-200 p-2 rounded-[12px] border border-gray-300 focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-transparent transition-all duration-300 ease-in-out"
                        />
                        <select
                            disabled
                            className="w-full bg-gray-200 p-2 rounded-[12px] border border-gray-300 focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-transparent transition-all duration-300 ease-in-out"
                        >
                            <option hidden>เลือกเวลา</option>
                            {['09:30:00', '10:30:00', '13:00:00', '14:00:00', '15:00:00', '17:00:00'].map(time => {
                                const disabled = findDay?.includes(update.datetime.split('T')[0]) && findTime?.includes(time);
                                return (
                                    <option key={time} value={time} disabled={disabled}>
                                        {time.slice(0, 5)}
                                    </option>
                                );
                            })}
                        </select>
                    </div> */}
                    <div className='mb-4'>
                        <label htmlFor='name' className='block text-gray-700 font-bold mb-2 '>
                            Phone
                        </label>
                        <input
                            readOnly
                            type='text'
                            value={update.phone}
                            name='phone'
                            className='w-full border-2 border-pink-500 p-2 rounded focus:outline-none focus:border-pink-700 text-gray-300'
                        />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='name' className='block text-gray-700 font-bold mb-2 '>
                            Disease
                        </label>
                        <input
                            readOnly
                            type='text'
                            name='disease'
                            value={update.disease}
                            className='w-full border-2 border-pink-500 p-2 rounded focus:outline-none focus:border-pink-700 text-gray-300'
                        />
                    </div>


                    <button
                        onClick={hdlClick}
                        type='submit'
                        className='bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none'
                    >
                        Edit
                    </button>
                </form>
            </div>)}
        </>
    );
}