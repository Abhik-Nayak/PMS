"use client"

import React, { useState } from 'react';
import ProjectHeader from '../ProjectHeader';
import { useParams } from 'next/navigation';
import BoardView from '../BoardView';
import List from "../ListView";
import Timeline from '../TimelineView.tsx';
import TableView from '../TableView';
import ModalNewTask from '@/components/ModalNewTask';

const Project = () => {
    const params = useParams(); // ✅ Unwrap params
    const { id } = params as { id: string }; // ✅ Extract `id`

    const [activeTab, setActiveTab] = useState("Board");
    const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);
    return (
        <div>
            <ModalNewTask isOpen={isModalNewTaskOpen}  onClose={() => setIsModalNewTaskOpen(false)} id={id} />
            <ProjectHeader id={id} activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === "Board" && (
                <BoardView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
            )}
            {activeTab === "List" && (
                <List id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
            )}
            {activeTab === "Timeline" && (
                <Timeline id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
            )}
            {activeTab === "Table" && (
                <TableView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
            )}
        </div>
    )
}

export default Project;