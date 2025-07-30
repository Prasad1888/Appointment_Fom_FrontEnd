// /* eslint-disable no-unused-vars */
import React, { } from 'react'
import { useForm } from 'react-hook-form'




function ReactForm() {

    const {
        register,
        handleSubmit,
        // watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm()


    const onSubmit = async (data) => {
        try {
            const backendURL = import.meta.env.VITE_BACKEND_URL

            let response = await fetch(`${backendURL}/submit`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json", // ✅ important!
                    },
                    body: JSON.stringify(data)
                }
            )
            if (!response.ok){
                throw new Error(`server error`)
            }
            alert('form submitted successfully')
            reset()
        } catch (error) {
            console.log(error)
            alert('form submission unsuccessful')
        }
    }

    return (
        <>
            <div className="container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input placeholder='नाव' {...register("Patient_Name", { required: true, message: "field is required" })} type='text' name="Patient_Name" id="userN" /> <br />
                    {errors.Patient_Name && <span>नाव आवश्यक आहे</span>}  <br />
                    <input placeholder='पत्ता' {...register("Patient_Address", { required: true, message: "field is required" })} type='text' name="Patient_Address" id="userA" /><br />
                    {errors.Patient_Address && <span>पत्ता आवश्यक आहे</span>} <br />
                    <input placeholder='संपर्क क्रमांक' {...register("Patient_Contact_Number", { required: true, message: "field is required" })} type='number' name="Patient_Contact_Number" id="userC" /><br />
                    {errors.Patient_Contact_Number && <span>संपर्क क्रमांक आवश्यक आहे</span>} <br />
                    <input disabled={isSubmitting} type="submit" value="अपॉइंटमेंटसाठी क्लिक करा" />
                </form>
            </div>
        </>
    )
}

export default ReactForm