package com.thymeleaf_iuran.Controllers.admin;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@RequestMapping("/admin/houses")
public class HouseController {

    @GetMapping
    public String index(Model model) {
        model.addAttribute("title", "Data Rumah");
        model.addAttribute("navbarTitle", "Data Rumah");
        return "admin/house/index";
    }

    @GetMapping("/create")
    public String create(Model model) {
        model.addAttribute("title", "Tambah Rumah");
        model.addAttribute("navbarTitle", "Tambah Rumah");
        return "admin/house/create";
    }

}
