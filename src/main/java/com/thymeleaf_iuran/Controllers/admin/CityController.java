package com.thymeleaf_iuran.Controllers.admin;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
@RequestMapping("/admin/cities")
public class CityController {

    @GetMapping
    public String index(Model model) {
        model.addAttribute("title", "Data Kota / Kabupaten");
        model.addAttribute("navbarTitle", "Data Kota / Kabupaten");
        return "admin/city/index";
    }

    @GetMapping("/create")
    public String create(Model model) {
        model.addAttribute("title", "Tambah Kota / Kabupaten");
        model.addAttribute("navbarTitle", "Tambah Kota / Kabupaten");
        return "admin/city/create";
    }

    @GetMapping("/update/{id}")
    public String update(Model model, @PathVariable("id") String id) {
        model.addAttribute("title", "Rubah Kota / Kabupaten");
        model.addAttribute("navbarTitle", "Rubah Kota / Kabupaten");
        model.addAttribute("dataId", id);
        return "admin/city/update";
    }

}
