import { Hono } from "hono";
import {serve} from "@hono/node-server"


interface Projects {
    project_name: string;
    description: string;
    image_src: string;
}

const app = new Hono();
const projects: Projects[] = [];