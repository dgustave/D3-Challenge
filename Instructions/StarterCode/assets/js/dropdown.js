export default {dropdownMenu(selection, props) {
    const {
        // This will be an array that is chosen from:
        options
    } = props;
    //select will only have one element at a time
    let  select = selection.selectALL('select').data([null]);
    select = select.enter().append('select').merge(select);

    const option = select.selectALL('option').data(options);
    option.enter().append('option')
        .merge(option)
        // The value returns itself in a function called 'd' and the text associated with it:
        .attr('value', d => d)
        .text(d => d);
}};