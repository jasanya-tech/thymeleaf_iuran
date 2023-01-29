package com.thymeleaf_iuran.Controllers.admin;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class DashboardController {
    @GetMapping
    public String dashboard(Model model) {
        model.addAttribute("title", "Dashboard");
        model.addAttribute("navbarTitle", "Dashboard");
        return "admin/dashboard";
    }
}
