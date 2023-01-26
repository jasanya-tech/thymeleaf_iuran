package com.thymeleaf_iuran.Controllers.admin;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
@RequestMapping("/admin/duesTypes")
public class DuesTypeController {

    @GetMapping
    public String index(Model model) {
        model.addAttribute("title", "Data Jenis Iuran");
        model.addAttribute("navbarTitle", "Data Jenis Iuran");
        return "admin/dues-type/index";
    }

    @GetMapping("/create")
    public String create(Model model) {
        model.addAttribute("title", "Tambah Jenis Iuran");
        model.addAttribute("navbarTitle", "Tambah Jenis Iuran");
        return "admin/dues-type/create";
    }

    @GetMapping("/update/{id}")
    public String update(Model model, @PathVariable("id") String id) {
        model.addAttribute("title", "Rubah Jenis Iuran");
        model.addAttribute("navbarTitle", "Rubah Jenis Iuran");
        model.addAttribute("dataId", id);
        return "admin/dues-type/update";
    }

}
