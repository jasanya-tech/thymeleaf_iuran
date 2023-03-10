package com.thymeleaf_iuran.Controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/houses")
    public String home(Model model) {
        model.addAttribute("title", "Houses Page Pagination");
        return "houses";
    }
}
