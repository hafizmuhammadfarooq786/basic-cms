import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "contactFilter"
})
export class SearchPipe implements PipeTransform {
  transform(organizations: any, contact: string): any {
    if (!organizations) return null;
    if (!contact) return organizations;
    return organizations.filter(function (item) {
      return item.contact.match(contact);
    });
  }
}
