package com.thevirtugroup.postitnote.repository;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.thevirtugroup.postitnote.model.Notes;

@Repository
public class NotesRepository {

	private static final List<Notes> noteList = new ArrayList<Notes>(); 	

    public void addNotes(Notes note){
    	noteList.add(note);
    }

    public List<Notes> getNotes(){
    	if(noteList!=null && noteList.isEmpty()) {
    		Notes a = new Notes();
    		a.setNotesSummary("Default note added");
    		a.setNoteDate(new Date().toString());
    		noteList.add(a);
    	}
        return noteList;
    }


}
