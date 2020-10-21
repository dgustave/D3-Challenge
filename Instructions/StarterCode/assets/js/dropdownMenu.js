export const dropdownMenu = (selection, props) => { 
    const {
        // This will be an array that is chosen from:
        options
    } = props; 
    let select = selection.selectALL('select').data([null]);
    //select will only have one element at a time
    select = select.enter().append('select').merge(select) ;
    select.selectALL('option').data(options); 
    options.enter().append('option')
        .merge(option)
        // The value returns itself in a function called 'd' and the text associated with it:
            .attr('value', d => d)
            .text(d => d);
};