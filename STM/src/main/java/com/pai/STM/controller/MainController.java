package com.pai.STM.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pai.STM.model.Account;
import com.pai.STM.model.Status;
import com.pai.STM.model.Task;
import com.pai.STM.model.Type;
import com.pai.STM.service.AccountService;
import com.pai.STM.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
public class MainController {

    AccountService accountService;
    TaskService taskService;

    @Autowired
    public MainController(AccountService accountService, TaskService taskService) {
        this.accountService = accountService;
        this.taskService = taskService;
    }

//    @PostMapping(value = "/account")
//    public void createAccount(
//            @RequestParam("name") String name,
//            @RequestParam("lastName") String lastName,
//            @RequestParam("email") String email,
//            @RequestParam("password") String password) {
//        accountService.createAccount(new Account(name, lastName, email, password));
//    }

    @PostMapping(value = "/account")
    public void createAccount(@RequestBody Account acc) {
        accountService.createAccount(new Account(acc.getName(), acc.getLastName(), acc.getEmail(), acc.getPassword()));
    }

    @GetMapping(value = "/accounts")
    public List<Account> getAllAccounts() {
        return accountService.getAllAccounts();
    }

    @GetMapping(value = "/account/id={id}")
    public Account findAccountById(@PathVariable("id") Integer id) {
        Optional foundAccount = accountService.findById(id);
        if (!foundAccount.isPresent()) {
            return null;
        }
        return (Account) foundAccount.get();
    }

    @GetMapping(value = "/account/email={email}")
    public Account findAccountByEmail(@PathVariable("email") String email) {
        Optional<Account> foundAccount = accountService.findByEmail(email);
        if (!foundAccount.isPresent()) {
            return null;
        }
        return (Account) foundAccount.get();
    }

    @GetMapping(value = "/account")
    public List<Account> getAccount(
            @RequestParam("accountId") Optional<Integer> id,
            @RequestParam("email") Optional<String> email
    ) {
        return accountService.getAccount(id,email);
    }

    @GetMapping(value = "/account/status")
    public List<Account> getAccount(
            @RequestParam("status") Boolean status
    ) {
        return accountService.getAccountsByStatus(status);
    }

    @PutMapping("/account/{id}")
    public ResponseEntity<Void> updateAccount(@PathVariable Integer id,@RequestBody Account acc){
        return accountService.findById(id).map(a-> {
                accountService.setAccount(acc);
                return new ResponseEntity<Void>(HttpStatus.OK);
            }).orElseGet(()-> ResponseEntity.notFound().build());
    }

    @PutMapping("/account/status/id={id}")
    public boolean activateAccount(@PathVariable("id") Integer id) {
        return accountService.activateAccount(id);
    }

    @DeleteMapping(value = "/account/delete")
    public String deleteAccount(@RequestParam("id") Integer id) {
//        check if deletes all relations
        return accountService.deleteAccountById(id);
    }

    @GetMapping(value = "/tasks")
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    //    @PostMapping(value = "/task")
//    public Task createNewTask(
//            @RequestParam("title") String title,
//            @RequestParam("description") String description,
//            @RequestParam("type") Type type,
//            @RequestParam("status") Status status,
//            @RequestParam("account") Integer accountId
//    ) {
//        return taskService.createTask(title, description, type, status, accountId);
//    }

    @PostMapping(value = "/task/{accountId}")
    public Task createNewTask(@PathVariable Integer accountId, @RequestBody Task task) {
        return taskService.createTask(
                task.getTitle(), task.getDescription(), task.getType(), task.getStatus(),accountId);
    }

    @PostMapping(value = "/task")
    public Task createNewTask(@RequestBody Task task) {
        return taskService.createTask(
                task.getTitle(), task.getDescription(), task.getType(), task.getStatus(),task.getAssignedAccount().getAccountId());
    }

    @GetMapping(value = "/task")
    public List<Task> getTask(
            @RequestParam("name") Optional<String> name,
            @RequestParam("status") Optional<String> status,
            @RequestParam("type") Optional<String> type
    ) {
//        TODO should be splitted to 3 different methods?
        if(name.get()!=""){
            return taskService.getTaskByTitle(name.get());
        }else if(status.get()!=""){
            return taskService.getTaskByStatus(Status.valueOf(status.get()));
        }else if(type.get()!="") {
            return taskService.getTaskByType(Type.valueOf(type.get()));
        }
        return null;
    }

    @PutMapping(value = "/task/status")
    public String changeTaskStatus(
            @RequestParam("id") Integer id,
            @RequestParam("status") Status status) {
        return taskService.changeStatus(id, status);
    }

    @DeleteMapping(value = "/task/delete")
    public String deleteTask(@RequestParam("id") Integer id) {
        return taskService.deleteTask(id);
    }

    @GetMapping(value = "/task/statuses")
    public List<String> getTaskStatuses(){
        List<Status> statusEnum = Arrays.asList(Status.values());
        List<String> statuses = new ArrayList<>();
        statusEnum.forEach(status-> statuses.add(status.toString()));
        return statuses;
    }

    @GetMapping(value="/task/types")
    public List<String> getTaskTypes(){
        List<Type> typeEnums = Arrays.asList(Type.values());
        List<String> types = new ArrayList<>();
        typeEnums.forEach(type-> types.add(type.toString()));
        return types;
    }

}
