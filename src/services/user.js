import axios from "@/config/axios";
import Cookies from "js-cookie";
import { createStandaloneToast  } from "@chakra-ui/react"

const { toast } = createStandaloneToast();

async function auth(flow, payload) {
    try {
        const { data } = await axios.post(`/auth/${flow}`,payload);
        const token =  data.data.token;

        toast({
            title: flow === "register" ? "Account created" : "Login Success",
            status: "success",
        });

        Cookies.set("token", token, { expires: 1 });
        setTimeout(()=> window.location.replace("/"),1000);
    } 
    catch (error) {
        toast({
            title: "Failed!",
            description: error.response.data.message,
            status: "error",
        });
    }
}

async function getUser(id) {
    try {
        const { data } = await axios.get(`/users/${id}`);
        return data.data;
    } 
    catch (error) {
        console.log(error)
    }
}

export {
    auth,
    getUser
}