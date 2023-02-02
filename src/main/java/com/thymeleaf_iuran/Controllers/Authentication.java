package com.thymeleaf_iuran.Controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/auth")
public class Authentication {

    @GetMapping
    public String login(Model model) {
        model.addAttribute("title", "Login Page");
        return "login";
    }

}
