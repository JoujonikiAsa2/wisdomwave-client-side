import React, { useState } from 'react';
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFViewer,
    Image,
} from "@react-pdf/renderer";
import useAuth from '../../../hooks/useAuth';
import { useParams } from 'react-router-dom';




const GetCertificate = () => {
    const { user } = useAuth()
    const [name, setName] = useState(user?.displayName);
    const {title, instructor, duration} = useParams()

    const handleSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        setName(name);
        console.log(name);
    }
    return (
        <div className='pt-20 w-full'>
            <div className='text-xl w-full flex flex-col gap-2 justify-center items-center py-10'>
                <p>Update Your Profile name for Certificate</p>
                <p> Make a copy of this certificate and keep it with you.</p>
            </div>
            <div className='w-full flex justify-center items-center lato'>
                <PDFViewer style={{ width: "60%", height: "800px", padding: "30px" }}>
                    {/* Start of the document*/}
                    <Document  >
                        {/*render a single page*/}
                        <Page size="A4" orientation='landscape' style={{ padding: "30px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
                            <View style={{ display: "flex", flexDirection: "row", gap: "10px", justifyContent: "center", alignItems: "center", marginBottom: "40px" }}>
                                <Image
                                    style={{ width: "60px", height: "60px" }}
                                    src="https://i.ibb.co/S3550Qv/logo-wave.png"

                                />
                                <Text style={{ fontSize: 24 }}>Wisdom Wave</Text>
                            </View>
                            <View style={{ textAlign: "center",  display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ fontSize: 16 }}>Certificate of completion</Text>
                                <Text style={{ fontSize: 30, fontWeight:700, marginTop: "10px", marginBottom: "10px" }}>{title}</Text>
                                <Text style={{ fontSize: 16 }}>Instructor: {instructor}</Text>
                                <Text style={{ fontSize: 16, padding: "10px", fontWeight: 300, color: "gray" }}>This certificate is awarded to {name} for completion of {title} course in WisdomWave.</Text>
                            </View>
                            <View style={{ textAlign: "center", marginTop: "40px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ marginTop: "10px", marginBottom: "10px", fontSize: 24, fontWeight: 700 }}>Name: {name}</Text>
                                <Text style={{ color: "gray", fontSize:"12"}}>Issue Date: {new Date().toLocaleDateString()}</Text>
                                <Text style={{  color: "gray", fontSize:"12"}}>Length: {duration} Month</Text>
                            </View>

                        </Page>
                    </Document>
                </PDFViewer>
            </div>
        </div>
    );
};

export default GetCertificate;
