'use client'

import { useState } from 'react';
import { TASK_VIEW_MODE } from '../../model/task.constants';
import type { Task, TasksQueryState, TaskViewMode } from '../../model/task.types';
import { TasksGrid } from './tasks-grid';
import { TasksList } from './tasks-list';
import { TasksToolbar } from './tasks-toolbar';

interface TasksClientSectionProps {
    tasks: Task[];
    queryState: TasksQueryState;
}

export function TasksClientSection({ tasks, queryState }: TasksClientSectionProps) {
    const [viewMode, setViewMode] = useState<TaskViewMode>(TASK_VIEW_MODE.GRID);

    return (
        <div className="space-y-6">
            <TasksToolbar
                queryState={queryState}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
            />

            {viewMode === TASK_VIEW_MODE.GRID ? (
                <TasksGrid tasks={tasks} />
            ) : (
                <TasksList tasks={tasks} />
            )}
        </div>
    );
}
