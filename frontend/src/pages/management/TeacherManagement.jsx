import React, {useState} from 'react';

const TeacherManagement = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        isWithdrawn: false,
        isSuspended: false,
        applicationStatus: '',
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('submitted')
    }
    return (
        <>
            {/* edit modal */}
            <div className="justify-center items-center flex pt-20 overflow-x-hidden overflow-y-hidden inset-0 z-50 outline-none focus:outline-none">
                <div className="sm:w-full w-max my-6 mx-auto max-w-3xl">

                    <form onSubmit={handleSubmit}>
                        <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-2">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">Product Information</h2>
                                <p className=" text-sm text-gray-600">You need to add a good Informations for a good results.</p>
                                <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-6">
                                        <label  className="block text-sm font-medium leading-6 text-gray-900">Product name</label>
                                        <div className="">
                                            <input
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                type="text" id="first-name" autoComplete="given-name" className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6" />
                                        </div>
                                        {/*{errors.name && <span className="text-red-600 text-xs">{errors.name}</span>}*/}
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label className="block text-sm font-medium leading-6 text-gray-900">Product price</label>
                                        <div className="">
                                            <input
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                type="email"  min="0"  id="last-name" autoComplete="family-name" className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6" />
                                        </div>
                                        {/*<div className='sm:w-full w-60'>
                                            {errors.price && <span className="text-red-600 text-xs">Price is Required</span>}
                                        </div>*/}
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label  className="block text-sm font-medium leading-6 text-gray-900">Phone</label>
                                        <div className="">
                                            <input
                                                value={formData.isWithdrawn}
                                                onChange={(e) => setFormData({ ...formData, isWithdrawn: e.target.value })}
                                                type="checkbox" name="last-name" id="last-name" autoComplete="family-name" className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6" />
                                        </div>
                                        {/*{errors.phone && <span className="text-red-600 text-xs">{errors.phone}</span>}*/}
                                    </div>

                                    {/*<div className="sm:col-span-2 sm:col-start-1">
                                        <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">Category</label>
                                        <div className="">
                                            <select
                                                value={formData.category_id}
                                                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                                                autoComplete="country-name" className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6">
                                                <option>select your category</option>
                                                {categories.map((category, index)=>(
                                                    <option key={index} value={category._id}>{category.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        {errors.category_id && <span className="text-red-600 text-xs">Category is Required</span>}
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">SubCategory</label>
                                        <div className="">
                                            <select
                                                value={formData.subCategory_id}
                                                onChange={(e) => setFormData({ ...formData, subCategory_id: e.target.value })}
                                                id="country" name="country" autoComplete="country-name"
                                                disabled={subCategories.length === 0}
                                                className=" block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6">
                                                <option>select your Subcategory</option>
                                                {subCategories.map((SubCategory, index)=>(
                                                    <option key={index} value={SubCategory._id}>{SubCategory.name}</option>
                                                ))}

                                            </select>
                                        </div>
                                        {errors.subCategory_id && <span className="text-red-600 text-xs">SubCategory is Required</span>}
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">City</label>
                                        <div className="">
                                            <select
                                                value={formData.city_id}
                                                onChange={(e) => setFormData({ ...formData, city_id: e.target.value })}
                                                id="country" name="country" autoComplete="country-name" className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6">
                                                <option >select your city</option>
                                                {cities.map((city, index)=>(
                                                    <option key={index} value={city._id}>{city.name}</option>
                                                ))}

                                            </select>
                                        </div>
                                        {errors.city_id && <span className="text-red-600 text-xs">City is Required</span>}
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">About</label>
                                        <div className="">
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    id="about" name="about" rows="2" className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"></textarea>
                                        </div>
                                        {errors.description && <span className="text-red-600 text-xs">{errors.description}</span>}
                                        <p className="mt-2 text-sm leading-6 text-gray-600">Write a few things about your product.</p>
                                    </div>*/}
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 flex items-center justify-end gap-x-6">
{/*
                            <button onClick={goBack} className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
*/}
                            <button type="submit" className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                        </div>

                    </form>

                </div>
            </div>
        </>
    );
};

export default TeacherManagement;