package com.pai.STM.service;

import com.pai.STM.model.Account;
import com.pai.STM.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccountService {

    @Autowired
    public AccountRepository accountRepo;

    public void createAccount(Account acc) {
        Account accountToSave = new Account(acc.getName(), acc.getLastName(), acc.getEmail(), acc.getPassword());
        accountRepo.save(accountToSave);
    }

    public List<Account> getAllAccounts() {
        return accountRepo.findAll();
    }

    public Optional<Account> findById(Integer id) {
        return accountRepo.findById(id);
    }

    public Optional findByEmail(String email) {
        return accountRepo.findByEmail(email);
    }

    public boolean activateAccount(Integer id) {
        Optional<Account> accountToActivate = accountRepo.findById(id);
        boolean accountStatus = false;
        if (accountToActivate.isPresent()) {
            Account foundAccount = accountToActivate.get();
            accountStatus = foundAccount.isStatus();
            foundAccount.setStatus(!accountStatus);
            accountRepo.save(foundAccount);
            return !accountStatus;
        }
        return accountStatus;
    }

    public String deleteAccountById(Integer id) {
        Optional<Account> accountToActivate = accountRepo.findById(id);
        if (accountToActivate.isPresent()) {
            Account foundAccount = accountToActivate.get();
            String accountId = String.valueOf(foundAccount.getAccountId());
            accountRepo.delete(foundAccount);
            return "Deleted: " + accountId;
        }
        return "Not found user!";
    }
}
