import Tag from "./Tag";

type Project = {
image: string;
title: string;
description: string;
descriptionPoints: string[];
mainTechs: Tag[];
demoUrl?: string;
codeUrl: string;
videoUrl?: string;
};

export default Project;