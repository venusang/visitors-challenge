export default function() {
  this.urlPrefix = "https://mini-visitors-service.herokuapp.com/api";

  this.get("/entries", schema => {
    return schema.entries.all();
  });
  this.post("/entries");
  this.patch("/entries/:id");
}
