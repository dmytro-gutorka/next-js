'use client';

import { Filter, LayoutGrid, List, Search } from 'lucide-react';
import { type SyntheticEvent, useState } from 'react';
import { Button } from '@/shared/lib/shadcn/components/ui/button';
import { Input } from '@/shared/lib/shadcn/components/ui/input';
import { Label } from '@/shared/lib/shadcn/components/ui/label';
import {
    TASK_PRIORITY_FILTER,
    TASK_SORT_BY_FILTER,
    TASK_STATUS_FILTER,
    TASK_VIEW_MODE,
    TASKS_SEARCH_BY_PARAMS,
} from '../../model/task.constants';
import type { TasksQueryState, TaskViewMode } from '../../model/task.types';
import { CreateTaskDialog } from '../modals/create-task-dialog';
import { usePathname, useRouter } from 'next/navigation';
import { buildTasksQueryString } from 'features/tasks/model/task.helpers';
import { CustomSelect } from 'shared/ui/custom-select';

interface TasksToolbarProps {
    queryState: TasksQueryState;
    viewMode: TaskViewMode;
    onViewModeChange: (viewMode: TaskViewMode) => void;
}

export function TasksToolbar({ queryState, viewMode, onViewModeChange }: TasksToolbarProps) {
    const [searchValue, setSearchValue] = useState(queryState.search);
    const router = useRouter();
    const pathname = usePathname();

    function updateQueryState(nextQueryState: Partial<TasksQueryState>) {
        const queryString = buildTasksQueryString(queryState, {
            ...nextQueryState,
            page: nextQueryState.page ?? '1',
        });

        router.replace(queryString ? `${pathname}?${queryString}` : pathname);
    }

    function handleSearchSubmit(event: SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();
        updateQueryState({ search: searchValue });
    }

    function handleResetFilters() {
        setSearchValue('');
        updateQueryState({
            search: '',
            status: TASK_STATUS_FILTER.ALL,
            priority: TASK_PRIORITY_FILTER.ALL,
            sortBy: TASK_SORT_BY_FILTER.UPDATED_AT,
            searchBy: TASKS_SEARCH_BY_PARAMS.TITLE,
        });
    }

    return (
        <div className="space-y-4 rounded-xl border bg-card p-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                <form
                    className="flex flex-1 flex-col gap-2 sm:flex-row"
                    onSubmit={handleSearchSubmit}
                >
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="tasks-search">Search</Label>
                        <Input
                            aria-label="Search tasks"
                            id="tasks-search"
                            value={searchValue}
                            placeholder="Search tasks"
                            onChange={(event) => setSearchValue(event.target.value)}
                        />
                    </div>
                    <div className="grid gap-2 sm:w-44">
                        <CustomSelect
                            label="Search By"
                            value={queryState.searchBy}
                            onValueChange={(searchBy) =>
                                updateQueryState({
                                    searchBy: searchBy as TasksQueryState['searchBy'],
                                })
                            }
                            options={[
                                [TASKS_SEARCH_BY_PARAMS.TITLE, 'Title'],
                                [TASKS_SEARCH_BY_PARAMS.DESCRIPTION, 'Description'],

                            ]}
                        />
                    </div>
                    <Button type="submit" className="sm:self-end">
                        <Search className="mr-2 size-4" />
                        Search
                    </Button>
                </form>

                <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                    <CreateTaskDialog />
                    <Button
                        type="button"
                        variant={viewMode === TASK_VIEW_MODE.GRID ? 'default' : 'outline'}
                        size="icon"
                        aria-label="Grid view"
                        onClick={() => onViewModeChange(TASK_VIEW_MODE.GRID)}
                    >
                        <LayoutGrid className="size-4" />
                    </Button>
                    <Button
                        type="button"
                        variant={viewMode === TASK_VIEW_MODE.LIST ? 'default' : 'outline'}
                        size="icon"
                        aria-label="List view"
                        onClick={() => onViewModeChange(TASK_VIEW_MODE.LIST)}
                    >
                        <List className="size-4" />
                    </Button>
                </div>
            </div>

            <div className="grid gap-3 md:grid-cols-4">
                <CustomSelect
                    label="Status"
                    value={queryState.status}
                    onValueChange={(status) =>
                        updateQueryState({ status: status as TasksQueryState['status'] })
                    }
                    options={[
                        [TASK_STATUS_FILTER.ALL, 'All statuses'],
                        [TASK_STATUS_FILTER.TODO, 'Todo'],
                        [TASK_STATUS_FILTER.IN_PROGRESS, 'In progress'],
                        [TASK_STATUS_FILTER.DONE, 'Done'],
                    ]}
                />
                <CustomSelect
                    label="Priority"
                    value={queryState.priority}
                    onValueChange={(priority) =>
                        updateQueryState({ priority: priority as TasksQueryState['priority'] })
                    }
                    options={[
                        [TASK_PRIORITY_FILTER.ALL, 'All priorities'],
                        [TASK_PRIORITY_FILTER.LOW, 'Low'],
                        [TASK_PRIORITY_FILTER.MEDIUM, 'Medium'],
                        [TASK_PRIORITY_FILTER.HIGH, 'High'],
                    ]}
                />
                <CustomSelect
                    label="Sort by"
                    value={queryState.sortBy}
                    onValueChange={(sortBy) =>
                        updateQueryState({ sortBy: sortBy as TasksQueryState['sortBy'] })
                    }
                    options={[
                        [TASK_SORT_BY_FILTER.UPDATED_AT, 'Updated date'],
                        [TASK_SORT_BY_FILTER.CREATED_AT, 'Created date'],
                        [TASK_SORT_BY_FILTER.DEADLINE, 'Deadline'],
                        [TASK_SORT_BY_FILTER.TITLE, 'Title'],
                    ]}
                />
                <div className="flex items-end">
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={handleResetFilters}
                    >
                        <Filter className="mr-2 size-4" />
                        Reset filters
                    </Button>
                </div>
            </div>
        </div>
    );
}