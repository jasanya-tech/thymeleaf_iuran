package com.thymeleaf_iuran.Controllers.admin;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
@RequestMapping("/admin/provinces")
public class ProvinceController {

    @GetMapping
    public String index(Model model) {
        model.addAttribute("title", "Data Provinsi");
        model.addAttribute("navbarTitle", "Data Provinsi");
        return "admin/province/index";
    }

    @GetMapping("/create")
    public String create(Model model) {
        model.addAttribute("title", "Tambah Provinsi");
        model.addAttribute("navbarTitle", "Tambah Provinsi");
        return "admin/province/create";
    }

    @GetMapping("/update/{id}")
    public String update(Model model, @PathVariable("id") String id) {
        model.addAttribute("title", "Rubah Provinsi");
        model.addAttribute("navbarTitle", "Rubah Provinsi");
        model.addAttribute("dataId", id);
        return "admin/province/update";
    }

}
