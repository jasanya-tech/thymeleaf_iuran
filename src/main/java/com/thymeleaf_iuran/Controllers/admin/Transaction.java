package com.thymeleaf_iuran.Controllers.admin;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin/transactions")
public class Transaction {

    // Melihat seluruh data transaction
    @GetMapping
    public String index(Model model) {
        model.addAttribute("title", "Transaksi");
        model.addAttribute("navbarTitle", "Transaksi");
        return "admin/transaction/index";
    }

    // Melihat detail transaction
    @GetMapping("/{transactionId}")
    public String detail(Model model, @PathVariable("transactionId") String transactionId) {
        model.addAttribute("title", "Transaksi detail");
        model.addAttribute("navbarTitle", "Transaksi detail");
        model.addAttribute("dataId", transactionId);
        return "admin/transaction/detail";
    }

    // Membuat Transaction
    @GetMapping("/create")
    public String create(Model model) {
        model.addAttribute("title", "Buat Transaksi");
        model.addAttribute("navbarTitle", "Buat Transaksi");
        return "admin/transaction/create";
    }
}
