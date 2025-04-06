package br.com.estudo.crud.service;

import br.com.estudo.crud.model.Lembrete;
import br.com.estudo.crud.repository.LembreteRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LembreteService {

    private final LembreteRepository repository;

    public List<Lembrete> listarTodos() {
        return repository.findAll();
    }

    public Lembrete listarPorId(Long id) {
        return repository.findById(id).orElseThrow(() ->  new EntityNotFoundException("Lembrete não encontrado"));
    }

    public Lembrete criarNovo(Lembrete lembrete) {
        return repository.save(lembrete);
    }

    public Lembrete alterar(Lembrete lembrete) {
        return repository.findById(lembrete.getId())
                .map(item -> {
                    item.setMensagem(lembrete.getMensagem());
                    item.setTitulo(lembrete.getTitulo());
                    return repository.save(item);
                }).orElseThrow(() -> new EntityNotFoundException("Lembrete não encontrado"));
    }

    public void apagar(Long id) {
        repository.deleteById(id);
    }
}
