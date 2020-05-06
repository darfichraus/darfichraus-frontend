export class SingleStateInformation {
  name: string;
  categoryInformation: Array<CategoryInformation>;

  getInformationForCategory(category: string): CategoryInformation {
    const index = this.categoryInformation.findIndex(cat => cat.category === category);
    if (index >= 0) {
      return this.categoryInformation[index];
    } else {
      return new CategoryInformation();
    }
  }
}

export class CategoryInformation {

  category: string;
  count: number;
  criticality: number;
}

export type StateInformation = Array<SingleStateInformation>;
