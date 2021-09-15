package com.thevirtugroup.postitnote.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.thevirtugroup.postitnote.model.Notes;
import com.thevirtugroup.postitnote.repository.NotesRepository;

	
/**
 */
@RestController
public class NoteController
{
	@Autowired
    private NotesRepository notesRepo;
	
	@RequestMapping(value = "/getNotes", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
	public List<Notes> getNotes(){				
		return notesRepo.getNotes();
	}
	
	@RequestMapping(value = "/addNotes", consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public void addNotes(@RequestBody Notes a){	
		System.out.println("Summary: "+a.getNotesSummary() + " Date"+ a.getNoteDate());
		notesRepo.addNotes(a);
	}
}
