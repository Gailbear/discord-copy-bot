// A skill to clone a category and all its children.
// usage: @copy-bot category my-new-category

module.exports = function(controller) {
  controller.hears("category", ["direct_mention", "mention"], async (bot, message) => {
    
    let category = message.guild.channels.get(message.channel.parentID);
    
    // make sure there has been a new category name supplied
    let tokens = message.text.split(' ');
    if (tokens.length !== 3){
      bot.reply(message, "You need to supply a category name as an argument!");
      return;
    }
    
    let newCategoryName = tokens[2];
    console.log(`Cloning ${category.name} and all its children to ${newCategoryName}.`);
    
    // asynchronously clone the category
    let newCategory = await category.clone({name: newCategoryName});
    console.log(`${category.name} successfully cloned.`);
    
    // now copy the children of the source category to the target category.
    let otherChannels = category.children;
    otherChannels.map(ch => {
      console.log(`cloning ${ch.name}`);
      ch.clone({parent: newCategory.id});
    });
    
    bot.reply(message, `A new category ${newCategoryName} has been created with all the same permissions and sub-channels as ${category.name}.`);
  });
}; 
