test('StartLoadingNotes debe de cargar las notas', () => {
    store.dispatch(startLoadingNotes('TESTING'));
    const actions = store.getActions();
   
    const expected = {
        id: expect.any(String),
        title: expect.any(String),
        body: expect.any(String),
        date: expect.any(Number)
    }
    expect(actions[0].payload[0]).toMatchObject(expected)
})
test('startSaveNote debe actualizar la nota', async() => {
    const note = {
        id: '8IFuBK1S3S7kXgKddLXp',
        title: 'titulo',
        body: 'body'
    };

    await store.dispatch(startSaveNote(note));

    const actions = store.getActions();

    expect(actions[0].type).toBe(types.notesUpdated);

    const docRef = doc(db, `TESTING/journal/notes/${note.id}`);
    
    const docSnap = await getDoc(docRef);
    
    expect (docSnap.data().title).toBe(note.title);
})

test('StartUploading debe actualizar el url del entry', async() => {
       
    fileUpload.mockReturnValue('https://hola-mundo.com');
    fs.writeFileSync('foto.jpg', '');
 
    const file = fs.readFileSync('foto.jpg');
    await store.dispatch(StartUploading(file));
 
    const docRef = doc( db, 'testId/journal/notes/NN1YSeMAr35mkoePjFrP' );
    const docRecived = await getDoc( docRef );
    
    expect(docRecived.data().url).toBe('https://hola-mundo.com');
});