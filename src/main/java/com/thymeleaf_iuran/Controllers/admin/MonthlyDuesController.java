package com.thymeleaf_iuran.Controllers.admin;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin/monthlyDues")
public class MonthlyDuesController {
    @GetMapping
    public String index(Model model) {
        model.addAttribute("title", "Data Iuran Bulanan");
        model.addAttribute("navbarTitle", "Data Iuran Bulanan");
        return "admin/monthly-dues/index";
    }

    @GetMapping("/detail/{id}")
    public String detail(Model model, @PathVariable("id") String id) {
        model.addAttribute("title", "Detail Monthly Dues");
        model.addAttribute("navbarTitle", "Detail Monthly Dues");
        model.addAttribute("dataId", id);
        return "admin/monthly-dues/detail";
    }

    @GetMapping("/update/{id}")
    public String update(Model model, @PathVariable("id") String id) {
        model.addAttribute("title", "Rubah Provinsi");
        model.addAttribute("navbarTitle", "Rubah Provinsi");
        model.addAttribute("dataId", id);
        return "admin/monthly-dues/update";
    }

}
