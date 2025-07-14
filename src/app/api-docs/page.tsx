"use client";
import { useEffect, useState } from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

const fetchSwaggerApiData = async () => {
    try {
        const response = await fetch("http://localhost:3000/api/docs", {
            cache: "no-store",
        });
        if (!response.ok) {
            throw new Error("Failed to fetch API docs");
        }
        return await response.json();
    } catch (error) {
        return { error: error, status: false }
    }
}
export default function ApiDocs() {
    const [data, setData] = useState()
    useEffect(() => {
        fetchSwaggerApiData().then(res => setData(res))
    }, [])
    return data ? <SwaggerUI spec={data} /> : <></>;
}

