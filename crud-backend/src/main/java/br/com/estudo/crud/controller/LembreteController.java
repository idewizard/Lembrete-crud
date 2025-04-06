package br.com.estudo.crud.controller;

import br.com.estudo.crud.model.Lembrete;
import br.com.estudo.crud.service.LembreteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/lembretes")
public class LembreteController {

    private final LembreteService service;

    @GetMapping("/listar")
    public List<Lembrete> listar(){
        return service.listarTodos();
    }

    @GetMapping("/listar/{id}")
    public Lembrete listarPorId(@PathVariable Long id){
        return service.listarPorId(id);
    }

    @PostMapping("/criar")
    public Lembrete criar(@RequestBody @Valid Lembrete lembrete){
        return service.criarNovo(lembrete);
    }

    @PutMapping("/alterar")
    public Lembrete alterar(@RequestBody @Valid Lembrete lembrete){
        return service.alterar(lembrete);
    }

    @DeleteMapping("/apagar/{id}")
    public void apagar(@PathVariable Long id){
        service.apagar(id);
    }

}
