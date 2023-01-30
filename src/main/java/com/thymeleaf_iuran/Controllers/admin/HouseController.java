package com.thymeleaf_iuran.Controllers.admin;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

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

    @GetMapping("/update/{id}")
    public String update(Model model, @PathVariable("id") String id) {
        model.addAttribute("title", "Rubah Data Rumah");
        model.addAttribute("navbarTitle", "Rubah Data Rumah");
        model.addAttribute("dataId", id);
        return "admin/house/update";
    }

}
