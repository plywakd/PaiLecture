package com.pai.STM.service;

import com.pai.STM.model.Account;
import com.pai.STM.model.Status;
import com.pai.STM.model.Task;
import com.pai.STM.model.Type;
import com.pai.STM.repository.AccountRepository;
import com.pai.STM.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    public TaskRepository taskRepo;
    @Autowired
    public AccountRepository accountRepo;


    public List<Task> getAllTasks() {
//        return taskRepo.findAll(); sort by date in java possible, but sql query is faster (?)
        return taskRepo.findAllOrderByDateDesc();
    }

    public Task createTask(String title, String description, Type type, Status status, Integer accountId) {
        Optional<Account> assignedAccount = accountRepo.findById(accountId);
        if (assignedAccount.isPresent()) {
            Account foundAccount = assignedAccount.get();
            Task taskToSave = new Task(title, description, type, status, foundAccount);
            return taskRepo.save(taskToSave);
        }
        return null;
    }

    public List<Task> getTask(Optional<String> name, Optional<Status> status, Optional<Type> type) {
        if (name.isPresent()) {
            return taskRepo.findByTitle(name.get());
        } else if (status.isPresent()) {
            return taskRepo.findByStatus(status.get());
        } else if (type.isPresent()) {
            return taskRepo.findByType(type.get());
        }
        return null;
    }

    public String changeStatus(Integer id, Status status) {
        Optional<Task> taskToChange = taskRepo.findById(id);
        if (taskToChange.isPresent()) {
            Task foundTask = taskToChange.get();
            if (status != foundTask.getStatus()) {
                foundTask.setStatus(status);
                taskRepo.save(foundTask);
                return "Changed status to: " + foundTask.getStatus();
            } else {
                return "Task has already that status";
            }
        }
        return "Status not changed";
    }

    public String deleteTask(Integer id) {
        Optional<Task> taskToChange = taskRepo.findById(id);
        if (taskToChange.isPresent()) {
            Task foundTask = taskToChange.get();
            String taskId = String.valueOf(foundTask.getTaskId());
            taskRepo.delete(foundTask);
            return "Deleted task id: " + taskId;
        }
        return "Task not found";
    }
}
